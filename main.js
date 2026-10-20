import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";

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

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(50);
camera.position.setX(-3);

// Cube setup
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({
  color: 0x800080,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

cube.position.z = -15;
cube.position.x = -15;
cube.rotation.x = 2;
cube.rotation.y = 0.5;

// Icosahedron and lighting setup
const ico = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff });
const icoMesh = new THREE.Mesh(ico, icoMaterial);
scene.add(icoMesh);

icoMesh.position.z = -15;
icoMesh.position.x = 15;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, -10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers and Controls
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  icoMesh.rotation.z += -0.03;
  icoMesh.rotation.y += -0.03;

  controls.update();

  renderer.render(scene, camera);
}

// Background and Textures
const spaceTexture = new THREE.TextureLoader().load("images/night_sky.jpg");
scene.background = spaceTexture;

const smileTexture = new THREE.TextureLoader().load("images/smile.jpg");
const smileMesh = new THREE.Mesh(
  new THREE.SphereGeometry(10, 22, 10),
  new THREE.MeshBasicMaterial({ map: smileTexture }),
);
scene.add(smileMesh);

animate();
