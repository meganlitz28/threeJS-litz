// ==========================================
// 1. IMPORTS & CONSTANTS SETUP
// ==========================================
import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js";

// Define core scene constants first
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

// Configure renderer and initial camera position
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

// ==========================================
// 2. SCENE BACKGROUND & TEXTURES
// ==========================================
// Load background starfield texture
const spaceTexture = new THREE.TextureLoader().load("images/night_sky.jpg");
scene.background = spaceTexture;

// ==========================================
// 3. LIGHTING & HELPERS
// ==========================================
// Point light for directional illumination and casting highlights
const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(0, -10, 10);

// Ambient light to softly illuminate all surfaces equally
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
ambientLight.position.set(25, -15, -400);

scene.add(pointLight);
scene.add(ambientLight);

// Scene helpers for debugging and visual reference
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper);
scene.add(gridHelper);

// ==========================================
// 4. 3D OBJECTS, MATERIALS & MESHES
// ==========================================

// --- Object 1: Basic Material Rotating Cube ---
const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
// Using MeshBasicMaterial (unaffected by lights)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x800080 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);
cube.position.z = -15;
cube.position.x = -15;

// --- Object 2: Phong Material Icosahedron ---
const icoGeometry = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff });
const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
scene.add(icoMesh);
icoMesh.position.z = -15;
icoMesh.position.x = 15;

// --- Object 3: Texture-Mapped Sphere ---
const smileTexture = new THREE.TextureLoader().load("images/smile.jpg");
const sphereGeometry = new THREE.SphereGeometry(10, 22, 10);
const smileMaterial = new THREE.MeshBasicMaterial({ map: smileTexture });
const smileMesh = new THREE.Mesh(sphereGeometry, smileMaterial);
scene.add(smileMesh);
smileMesh.position.y = 20;

// --- Object 4: Normal Mapped Torus Knot ---
const normalTexture = new THREE.TextureLoader().load(
  "images/normals/textureNormal.png",
);
const torusGeo = new THREE.TorusKnotGeometry(5, 1, 250, 5, 9, 15);
const torusMaterial = new THREE.MeshStandardMaterial({
  normalMap: normalTexture,
  roughness: 0,
  metalness: 0.8,
});
const torusKnot = new THREE.Mesh(torusGeo, torusMaterial);
scene.add(torusKnot);
torusKnot.position.x = -30;
torusKnot.position.y = 0;

// ==========================================
// 5. INTERACTIVE CONTROLS
// ==========================================
const controls = new OrbitControls(camera, renderer.domElement);

// ==========================================
// 6. ANIMATION LOOP
// ==========================================
function animate() {
  requestAnimationFrame(animate);

  // Rotate objects each frame
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  icoMesh.rotation.z += -0.03;
  icoMesh.rotation.y += -0.03;

  smileMesh.rotation.y += 0.05;
  torusKnot.rotation.x += 0.02;

  // Update orbit controls in real time
  controls.update();

  // Render scene from camera perspective
  renderer.render(scene, camera);
}

// Kick off animation loop
animate();
