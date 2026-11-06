import * as THREE from "three";

function panelPoint(t: number, s: number, side: -1 | 1) {
  const length = 1.66;
  const x = 0.05 + t * length;
  const width = s * Math.pow(Math.sin(t * Math.PI), 0.85) * 0.58;
  const hook = t * t * 0.28;
  const y = side * (width + hook * 0.15) - hook * 0.55;
  const drop = s * 0.26 * Math.sin(t * Math.PI);
  const lift = (1 - s) * 0.015 + Math.pow(t, 2) * 0.035;
  const z = lift - drop;
  return new THREE.Vector3(x, y, z);
}

function shadeFor(t: number, s: number) {
  return 0.985 - s * 0.05 * Math.sin(t * Math.PI) - (1 - t) * 0.02;
}

function buildPanel(side: -1 | 1, rows = 26, cols = 7, thickness = 0.007) {
  const stride = cols + 1;
  const front: THREE.Vector3[] = [];
  const shades: number[] = [];

  for (let i = 0; i <= rows; i += 1) {
    for (let j = 0; j <= cols; j += 1) {
      const t = i / rows;
      const s = j / cols;
      front.push(panelPoint(t, s, side));
      shades.push(shadeFor(t, s));
    }
  }

  const normals = front.map(() => new THREE.Vector3());
  const accumulate = (a: number, b: number, c: number) => {
    const normal = new THREE.Vector3().crossVectors(front[b].clone().sub(front[a]), front[c].clone().sub(front[a]));
    normals[a].add(normal);
    normals[b].add(normal);
    normals[c].add(normal);
  };

  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      const a = i * stride + j;
      const b = a + 1;
      const c = a + stride;
      const d = c + 1;
      if (side === 1) {
        accumulate(a, b, c);
        accumulate(b, d, c);
      } else {
        accumulate(a, c, b);
        accumulate(b, c, d);
      }
    }
  }
  normals.forEach((normal) => {
    if (normal.lengthSq() > 0) normal.normalize();
    else normal.set(0, 0, 1);
  });

  const back = front.map((point, index) => point.clone().addScaledVector(normals[index], -thickness));
  const positions: number[] = [];
  const colors: number[] = [];
  const push = (point: THREE.Vector3, shade: number) => {
    positions.push(point.x, point.y, point.z);
    colors.push(shade, shade * 0.99, shade * 0.965);
  };
  front.forEach((point, index) => push(point, shades[index]));
  back.forEach((point, index) => push(point, shades[index] * 0.9));

  const indices: number[] = [];
  const backOffset = front.length;
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      const a = i * stride + j;
      const b = a + 1;
      const c = a + stride;
      const d = c + 1;
      if (side === 1) {
        indices.push(a, b, c, b, d, c);
        indices.push(backOffset + a, backOffset + c, backOffset + b, backOffset + b, backOffset + c, backOffset + d);
      } else {
        indices.push(a, c, b, b, c, d);
        indices.push(backOffset + a, backOffset + b, backOffset + c, backOffset + b, backOffset + d, backOffset + c);
      }
    }
  }

  const stitch = (a: number, b: number) => {
    indices.push(a, b, backOffset + a, b, backOffset + b, backOffset + a);
  };
  for (let j = 0; j < cols; j += 1) stitch(j, j + 1);
  for (let j = 0; j < cols; j += 1) {
    const row = rows * stride;
    stitch(row + j + 1, row + j);
  }
  for (let i = 0; i < rows; i += 1) {
    stitch((i + 1) * stride, i * stride);
    stitch(i * stride + cols, (i + 1) * stride + cols);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function createBladePanels() {
  return {
    left: buildPanel(-1),
    right: buildPanel(1),
  };
}

export function createPaperTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return null;
  const image = context.createImageData(size, size);
  for (let i = 0; i < image.data.length; i += 4) {
    const grain = 226 + Math.random() * 29;
    image.data[i] = grain;
    image.data[i + 1] = grain - 1;
    image.data[i + 2] = grain - 6;
    image.data[i + 3] = 255;
  }
  context.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
