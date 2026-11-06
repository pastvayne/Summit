type MountOptions = {
  canvas: HTMLCanvasElement;
  track: HTMLElement;
  copy: HTMLElement;
  cue: HTMLElement | null;
};

const DESKTOP_PEAK = [0.74, 0.67];
const MOBILE_PEAK = [0.5, 0.76];

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D uImage;
uniform vec2 uCover;
uniform vec2 uPeak;
uniform vec2 uPan;
uniform float uZoom;
uniform float uTime;
uniform float uMotion;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 cov = (vUv - 0.5) * uCover + 0.5 + uPan;
  vec2 texUv = (cov - uPeak) / uZoom + uPeak;
  texUv = clamp(texUv, 0.001, 0.999);
  vec3 color = texture2D(uImage, texUv).rgb;

  float far = fbm(vec2(vUv.x * 1.2 + uTime * 0.006 * uMotion, vUv.y * 0.8));
  float farBand = smoothstep(0.42, 0.12, vUv.y);
  color = mix(color, color + vec3(0.03, 0.025, 0.05), far * farBand * 0.12);

  float near = fbm(vec2(vUv.x * 2.4 + uTime * 0.016 * uMotion, vUv.y * 1.8 - uTime * 0.004 * uMotion));
  float nearBand = smoothstep(0.22, 0.0, vUv.y);
  vec3 nearMist = mix(vec3(0.18, 0.16, 0.26), vec3(0.62, 0.56, 0.72), near);
  color = mix(color, nearMist, smoothstep(0.45, 0.8, near) * nearBand * 0.2);

  float motes = 0.0;
  for (int i = 0; i < 8; i++) {
    float fi = float(i);
    float sx = fract(sin(fi * 91.73) * 43758.5453);
    float sy = fract(sin(fi * 37.21) * 23421.631);
    float speed = 0.004 + fract(sin(fi * 12.4) * 97.0) * 0.008;
    float y = fract(sy + uTime * speed * uMotion);
    float x = sx + sin(uTime * 0.11 + fi) * 0.006 * uMotion;
    float tw = 0.45 + 0.55 * (0.5 + 0.5 * sin(uTime * 0.7 + fi));
    motes += smoothstep(0.0024, 0.0, length(vUv - vec2(x, y))) * tw;
  }
  float sky = smoothstep(0.5, 0.78, vUv.y);
  color += vec3(0.94, 0.91, 1.0) * motes * 0.45 * sky;

  gl_FragColor = vec4(color, 1.0);
}
`;

type Plate = { texture: WebGLTexture; width: number; height: number; peak: number[] };

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function loadPlate(gl: WebGLRenderingContext, url: string, peak: number[]): Promise<Plate> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      const texture = gl.createTexture();
      if (!texture) {
        reject(new Error("texture"));
        return;
      }
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      resolve({ texture, width: image.naturalWidth, height: image.naturalHeight, peak });
    };
    image.onerror = () => reject(new Error(url));
    image.src = url;
  });
}

function coverScale(canvasW: number, canvasH: number, imageW: number, imageH: number) {
  const canvasAspect = canvasW / Math.max(1, canvasH);
  const imageAspect = imageW / Math.max(1, imageH);
  if (canvasAspect > imageAspect) {
    return [1, imageAspect / canvasAspect];
  }
  return [canvasAspect / imageAspect, 1];
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function mountSummit({ canvas, track, copy, cue }: MountOptions) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  if (reduced || saveData) return () => {};

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
  });

  if (!gl || reduced || saveData) {
    return () => {};
  }

  const vertex = compile(gl, gl.VERTEX_SHADER, VERT);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vertex || !fragment) return () => {};

  const program = gl.createProgram();
  if (!program) return () => {};
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return () => {};
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.useProgram(program);

  const uniforms = {
    image: gl.getUniformLocation(program, "uImage"),
    cover: gl.getUniformLocation(program, "uCover"),
    peak: gl.getUniformLocation(program, "uPeak"),
    pan: gl.getUniformLocation(program, "uPan"),
    zoom: gl.getUniformLocation(program, "uZoom"),
    time: gl.getUniformLocation(program, "uTime"),
    motion: gl.getUniformLocation(program, "uMotion"),
  };

  let desktop: Plate | null = null;
  let mobile: Plate | null = null;
  let frame = 0;
  let running = true;
  let visible = true;
  let pointerX = 0;
  let pointerY = 0;
  let currentFade = 1;
  const started = performance.now();

  const mobileQuery = window.matchMedia("(max-width: 767px)");

  const resize = () => {
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (cssW < 2 || cssH < 2) return;
    const narrow = cssW < 768;
    const dpr = cssW >= 1600 ? 1 : Math.min(window.devicePixelRatio || 1, narrow ? 1.15 : 1.25);
    let width = Math.round(cssW * dpr);
    let height = Math.round(cssH * dpr);
    const maxEdge = narrow ? 1000 : 2560;
    if (width > maxEdge) {
      const scale = maxEdge / width;
      width = maxEdge;
      height = Math.max(1, Math.round(height * scale));
    }
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  };

  const draw = (now: number) => {
    const plate = mobileQuery.matches && mobile ? mobile : desktop;
    if (!plate) return;
    resize();
    const time = (now - started) / 1000;
    const rect = track.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    const zoom = 1 + Math.sin(time * 0.027) * 0.004 + Math.sin(time * 0.011) * 0.003 + progress * 0.035;
    const panX = Math.sin(time * 0.021) * 0.003 + pointerX * 0.004;
    const panY = Math.cos(time * 0.017) * 0.002 + pointerY * 0.003 - progress * 0.004;

    gl.useProgram(program);
    gl.bindTexture(gl.TEXTURE_2D, plate.texture);
    gl.uniform1i(uniforms.image, 0);
    const cover = coverScale(canvas.width, canvas.height, plate.width, plate.height);
    gl.uniform2f(uniforms.cover, cover[0], cover[1]);
    gl.uniform2f(uniforms.peak, plate.peak[0], plate.peak[1]);
    gl.uniform2f(uniforms.pan, panX, panY);
    gl.uniform1f(uniforms.zoom, zoom);
    gl.uniform1f(uniforms.time, time);
    gl.uniform1f(uniforms.motion, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    const fade = 1 - smoothstep(0.12, 0.62, progress);
    currentFade += (fade - currentFade) * 0.08;
    copy.style.opacity = currentFade.toFixed(3);
    copy.style.transform = `translate3d(0, ${(-progress * 42).toFixed(2)}px, 0)`;
    if (cue) cue.style.opacity = currentFade.toFixed(3);
    if (currentFade < 0.05) copy.style.pointerEvents = "none";
    else copy.style.pointerEvents = "";
  };

  const loop = (now: number) => {
    if (!running) return;
    if (visible && !document.hidden) draw(now);
    frame = requestAnimationFrame(loop);
  };

  const onPointer = (event: PointerEvent) => {
    if (!finePointer) return;
    const rect = canvas.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * -2;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
    },
    { threshold: 0 },
  );
  observer.observe(track);
  window.addEventListener("pointermove", onPointer, { passive: true });

  void Promise.all([
    loadPlate(gl, "/summit/hero.jpg", DESKTOP_PEAK),
    loadPlate(gl, "/summit/hero-mobile.jpg", MOBILE_PEAK),
  ])
    .then(([wide, tall]) => {
      if (!running) return;
      desktop = wide;
      mobile = tall;
      canvas.parentElement?.classList.add("is-live");
      resize();
      draw(performance.now());
      frame = requestAnimationFrame(loop);
    })
    .catch(() => {
      canvas.parentElement?.classList.remove("is-live");
    });

  return () => {
    running = false;
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener("pointermove", onPointer);
    gl.deleteProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    gl.deleteBuffer(buffer);
    if (desktop) gl.deleteTexture(desktop.texture);
    if (mobile) gl.deleteTexture(mobile.texture);
  };
}
