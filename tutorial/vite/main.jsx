import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const canvas = document.getElementById('canvas');
    const scene = new THREE.Scene();

    scene.background = new THREE.Color('#f0f0f0');

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const geometry = new THREE.DodecahedronGeometry();
    const material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' });

    const dode = new THREE.Mesh(geometry, material);

    const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
    const boxmaterial = new THREE.MeshStandardMaterial({ color: '#B3B3B3', emissive: '#B3B3B3' });
    const box = new THREE.Mesh(boxGeometry, boxmaterial);
    box.position.y = -1.5;
    scene.add(box);
    scene.add(dode);

    const light = new THREE.SpotLight(0x006769, 100);
    light.position.set(1, 1, 1);
    scene.add(light);

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();

   