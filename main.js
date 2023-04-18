import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const loader = new GLTFLoader();
loader.load('./models/JAZZKID.glb', function (gltf) {
    const text = gltf.scene
    text.scale.set(5, 5, 5)
    text.position.set(0, 0, 0)
    scene.add(text)
    text.rotation.x = 1.1


    // Rotation animation

    let rotationSpeed = 0.002;
    let rotationDirection = new THREE.Vector3(1, 1, 1).normalize();

    const rotateText = () => {
        requestAnimationFrame(rotateText);
        text.rotation.x += rotationSpeed * rotationDirection.x;
        text.rotation.y += rotationSpeed * rotationDirection.y;
        text.rotation.z += rotationSpeed * rotationDirection.z;
        renderer.render(scene, camera);
    }
    rotateText();
});


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
scene.add(pointLight)

// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(0, 0, 1);
// scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();