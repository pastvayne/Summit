type MountOptions = {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
  track: HTMLElement;
  copy: HTMLElement;
  cue: HTMLElement | null;
};

/**
 * Zoom origin and cover focus for each plate, in texture UV (y up).
 * focus mirrors the CSS object-position on .plate img: x% and (1 - y)%.
 */
const WIDE = { origin: [0.7, 0.66], focus: [0.62, 0.56] } as const;
const TALL = { origin: [0.5, 0.76], focus: [0.5, 0.6] } as const;

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

// GLSL ES 1.0 so the same shader runs on WebGL2 (with mipmaps) and WebGL1 (without).
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D uImage;
uniform vec2 uCover;
uniform vec2 uCenter;
uniform vec2 uOrigin;
uniform vec2 uPan;
uniform vec2 uTexSize;
uniform float uZoom;
uniform float uTime;
uniform float uMotion;
uniform float uMips;
varying vec2 vUv;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
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

float luma(vec3 c) {
  return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

void main() {
  vec2 cov = (vUv - 0.5) * uCover + uCenter + uPan;
  vec2 texUv = (cov - uOrigin) / uZoom + uOrigin;
  texUv = clamp(texUv, 0.0005, 0.9995);
  vec3 color = texture2D(uImage, texUv).rgb;

  // Star twinkle: isolate point highlights against a blurred mip, only in open dark sky.
  if (uMips > 0.5) {
    vec3 soft = texture2D(uImage, texUv, 4.0).rgb;
    float excess = max(luma(color) - luma(soft) - 0.025, 0.0);
    float skyMask = smoothstep(0.15, 0.07, luma(soft)) * smoothstep(0.42, 0.62, texUv.y);
    float h = hash(floor(texUv * uTexSize / 7.0));
    float tw = sin(uTime * (0.6 + h * 1.9) + h * 6.2831);
    color += vec3(0.95, 0.93, 1.0) * excess * tw * 0.85 * skyMask * uMotion;
  }

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
    float sx = hash(vec2(fi, 91.73));
    float sy = hash(vec2(37.21, fi));
    float speed = 0.004 + hash(vec2(fi, 12.4)) * 0.008;
    float y = fract(sy + uTime * speed * uMotion);
    float x = sx + sin(uTime * 0.11 + fi) * 0.006 * uMotion;
    float tw = 0.45 + 0.55 * (0.5 + 0.5 * sin(uTime * 0.7 + fi));
    vec2 d = (vUv - vec2(x, y)) * vec2(uCover.x / uCover.y, 1.0);
    motes += smoothstep(0.0028, 0.0, length(d)) * tw;
  }
  float sky = smoothstep(0.5, 0.78, vUv.y);
  color += vec3(0.94, 0.91, 1.0) * motes * 0.45 * sky;

  // +-0.5 LSB dither so the dark violet gradient never bands on 8-bit panels.
  color += (hash(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) / 255.0;

  gl_FragColor = vec4(color, 1.0);
}
`;

type Plate = { texture: WebGLTexture; width: number; height: number; src: string; mips: boolean };

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

function coverScale(canvasW: number, canvasH: number, imageW: number, imageH: number) {
  const canvasAspect = canvasW / Math.max(1, canvasH);
  const imageAspect = imageW / Math.max(1, imageH);
  if (canvasAspect > imageAspect) return [1, imageAspect / canvasAspect];
  return [canvasAspect / imageAspect, 1];
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Drives the hero plate with WebGL. The texture is whatever the <img> already
 * downloaded (its currentSrc), so the browser's srcset picks the resolution once
 * and the canvas never fetches a second copy.
 */
export function mountSummit({ canvas, image, track, copy, cue }: MountOptions) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  if (reduced || saveData) return () => {};

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const attrs: WebGLContextAttributes = {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
  };
  const gl2 = canvas.getContext("webgl2", attrs);
  const gl = (gl2 ?? canvas.getContext("webgl", attrs)) as WebGLRenderingContext | null;
  if (!gl) return () => {};
  const canMip = Boolean(gl2);

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

  const u = (name: string) => gl.getUniformLocation(program, name);
  const uniforms = {
    image: u("uImage"),
    cover: u("uCover"),
    center: u("uCenter"),
    origin: u("uOrigin"),
    pan: u("uPan"),
    texSize: u("uTexSize"),
    zoom: u("uZoom"),
    time: u("uTime"),
    motion: u("uMotion"),
    mips: u("uMips"),
  };

  let plate: Plate | null = null;
  let frame = 0;
  let running = true;
  let visible = true;
  let pointerX = 0;
  let pointerY = 0;
  let easedX = 0;
  let easedY = 0;
  let currentFade = 1;
  let quality = 1;
  let last = performance.now();
  let slowFrames = 0;
  const started = performance.now();

  const upload = () => {
    const src = image.currentSrc || image.src;
    if (!image.complete || !image.naturalWidth || plate?.src === src) return;
    const texture = gl.createTexture();
    if (!texture) return;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    try {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    } catch {
      gl.deleteTexture(texture);
      return;
    }
    if (canMip) {
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (plate) gl.deleteTexture(plate.texture);
    plate = { texture, width: image.naturalWidth, height: image.naturalHeight, src, mips: canMip };
  };

  // Only hand over from the <img> once a real frame exists on the canvas.
  let live = false;
  const goLive = () => {
    if (live) return;
    live = true;
    canvas.parentElement?.classList.add("is-live");
  };

  const resize = () => {
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (cssW < 2 || cssH < 2) return;
    // Real device pixels (capped at 2x) inside a pixel budget, scaled down only if frames run slow.
    const dpr = Math.min(window.devicePixelRatio || 1, 2) * quality;
    let width = cssW * dpr;
    let height = cssH * dpr;
    const budget = cssW < 768 ? 2.6e6 : 4.6e6;
    if (width * height > budget) {
      const scale = Math.sqrt(budget / (width * height));
      width *= scale;
      height *= scale;
    }
    width = Math.round(width);
    height = Math.round(height);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  };

  const draw = (now: number) => {
    if (!plate) return;
    resize();
    const time = (now - started) / 1000;
    const rect = track.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const progress = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
    easedX += (pointerX - easedX) * 0.05;
    easedY += (pointerY - easedY) * 0.05;
    const zoom = 1 + Math.sin(time * 0.02) * 0.003 + progress * 0.03;
    const panX = Math.sin(time * 0.021) * 0.003 + easedX * 0.005;
    const panY = Math.cos(time * 0.017) * 0.002 + easedY * 0.004 - progress * 0.006;

    const tall = plate.height > plate.width;
    const art = tall ? TALL : WIDE;
    const cover = coverScale(canvas.width, canvas.height, plate.width, plate.height);
    // Same maths as CSS object-position (focus as a percentage of the overflow), with a
    // small inset for the pan/zoom drift, so the canvas lands exactly on the <img> it replaces.
    const inset = 0.985;
    const cw = cover[0] * inset;
    const ch = cover[1] * inset;
    const cx = art.focus[0] * (1 - cw) + cw / 2;
    const cy = art.focus[1] * (1 - ch) + ch / 2;
    cover[0] = cw;
    cover[1] = ch;

    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, plate.texture);
    gl.uniform1i(uniforms.image, 0);
    gl.uniform2f(uniforms.cover, cover[0], cover[1]);
    gl.uniform2f(uniforms.center, cx, cy);
    gl.uniform2f(uniforms.origin, art.origin[0], art.origin[1]);
    gl.uniform2f(uniforms.pan, panX, panY);
    gl.uniform2f(uniforms.texSize, plate.width, plate.height);
    gl.uniform1f(uniforms.zoom, zoom);
    gl.uniform1f(uniforms.time, time);
    gl.uniform1f(uniforms.motion, 1);
    gl.uniform1f(uniforms.mips, plate.mips ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    goLive();

    const fade = 1 - smoothstep(0.1, 0.6, progress);
    currentFade += (fade - currentFade) * 0.1;
    copy.style.opacity = currentFade.toFixed(3);
    copy.style.transform = `translate3d(0, ${(-progress * 48).toFixed(2)}px, 0)`;
    if (cue) cue.style.opacity = currentFade.toFixed(3);
    copy.style.pointerEvents = currentFade < 0.05 ? "none" : "";
  };

  const loop = (now: number) => {
    if (!running) return;
    const delta = now - last;
    last = now;
    if (visible && !document.hidden) {
      draw(now);
      // Adaptive resolution: if the GPU keeps missing ~40fps, drop render scale a notch.
      if (delta > 25 && delta < 250) slowFrames += 1;
      else slowFrames = Math.max(0, slowFrames - 1);
      if (slowFrames > 45 && quality > 0.6) {
        quality = Math.max(0.6, quality - 0.15);
        slowFrames = 0;
      }
    }
    frame = requestAnimationFrame(loop);
  };

  const onPointer = (event: PointerEvent) => {
    if (!finePointer) return;
    pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
    pointerY = (event.clientY / window.innerHeight - 0.5) * -2;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
    },
    { threshold: 0 },
  );
  observer.observe(track);
  window.addEventListener("pointermove", onPointer, { passive: true });

  // The <picture> swaps sources across the mobile breakpoint; follow it.
  const onImageLoad = () => upload();
  image.addEventListener("load", onImageLoad);
  if (image.complete) upload();
  frame = requestAnimationFrame(loop);

  return () => {
    running = false;
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener("pointermove", onPointer);
    image.removeEventListener("load", onImageLoad);
    gl.deleteProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    gl.deleteBuffer(buffer);
    if (plate) gl.deleteTexture(plate.texture);
    canvas.parentElement?.classList.remove("is-live");
  };
}
