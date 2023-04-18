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

    const updateRotationDirectionUsingMouseLocation = (e) => {
        rotationDirection = new THREE.Vector3(e.clientX / window.innerWidth * 2 - 1, e.clientY / window.innerHeight * 2 - 1, Math.random() * 2 - 1).normalize();
    }

    const updateRotationSpeedUsingDistanceFromCenter = (e) => {
        rotationSpeed = Math.min(0.000 + (Math.abs(e.clientX - window.innerWidth / 2) + Math.abs(e.clientY - window.innerHeight / 2)) / 10000, 0.05);
    }

    document.addEventListener('click', updateRotationDirectionUsingMouseLocation);
    document.addEventListener('click', updateRotationSpeedUsingDistanceFromCenter);

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        rotationSpeed = 0;
    });

});


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 10);
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(-10, -10, -10);
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xffffff);
pointLight3.position.set(0, 0, -10);
scene.add(pointLight3)

const pointLight4 = new THREE.PointLight(0xffffff);
pointLight4.position.set(0, 0, 10);
scene.add(pointLight4)



const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

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

const instructions = document.createElement('div');
instructions.classList.add('instructions');
instructions.innerHTML = 'Touch or click for light entertainment';
instructions.style.position = 'fixed';
instructions.style.top = '1';
// half way accross the screen
instructions.style.left = '50%';
instructions.style.color = 'white';
instructions.style.fontSize = '2rem';
document.body.appendChild(instructions);
document.addEventListener('click', () => {
    instructions.style.display = 'none';
});


function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();