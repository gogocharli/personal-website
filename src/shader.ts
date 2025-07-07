import * as THREE from 'three';
import fragmentShaderSource from './_main.frag?raw';
import vertexShaderSource from './_main.vert?raw';

const canvasElement = document.querySelector('canvas#shader')!;
const shaderContainer = document.querySelector('.shader-container')!;

const textureLoader = new THREE.TextureLoader();

const canvasSize = shaderContainer.getBoundingClientRect();

const sizes = {
  width: canvasSize?.width ?? 0,
  height: canvasSize?.height ?? 0,
  originX: canvasSize?.left ?? 0,
};

const hues = [336, 343, 350, 357, 364];

const scene = new THREE.Scene();
const geometry = new THREE.PlaneGeometry(sizes.width, sizes.height);
const material = new THREE.ShaderMaterial({
  uniforms: {
    u_time: { value: 0.0 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_resolution: { value: new THREE.Vector2(sizes.width, sizes.height) },
    u_seed: { value: hues[Math.floor(Math.random() * hues.length)] },
    u_texture: {
      value: textureLoader.load('/gogocharli-wordmark.jpg'),
    },
  },
  vertexShader: vertexShaderSource,
  fragmentShader: fragmentShaderSource,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.OrthographicCamera(
  sizes.width / -2,
  sizes.width / 2,
  sizes.height / 2,
  sizes.height / -2,
  0.1,
  1000,
);

scene.add(camera);
camera.lookAt(mesh.position);
camera.translateZ(1);

const renderer = new THREE.WebGLRenderer({ canvas: canvasElement });

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

window.addEventListener('resize', () => {
  const newSize = shaderContainer.getBoundingClientRect();
  sizes.width = newSize?.width ?? 0;
  sizes.height = newSize?.height ?? 0;
  sizes.originX = newSize?.left ?? 0;

  camera.left = sizes.width / -2;
  camera.right = sizes.width / 2;
  camera.top = sizes.height / 2;
  camera.bottom = sizes.height / -2;
  camera.updateProjectionMatrix();

  if (mesh && mesh.geometry) {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.PlaneGeometry(sizes.width, sizes.height);
  }

  material.uniforms.u_resolution.value.x = sizes.width;
  material.uniforms.u_resolution.value.y = sizes.height;

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('mousemove', (e: MouseEvent) => {
  material.uniforms.u_mouse.value.x = e.clientX - sizes.originX;
  material.uniforms.u_mouse.value.y = sizes.height - e.clientY;
});

const clock = new THREE.Clock();
function tick() {
  const elapsedTime = clock.getElapsedTime();
  material.uniforms.u_time.value = elapsedTime;

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
}

tick();
