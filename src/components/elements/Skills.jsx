import React, { useRef, useState, useMemo, useEffect, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Billboard, OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import { techskills } from "../data";
import CanvasLoader from "./Loader";

// SVG Icon component using textured plane
function IconPlane({ position, icon, name }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Load the SVG texture only once when component mounts
  const texture = useLoader(TextureLoader, icon);

  // Memoize the highlight color to avoid recalculation
  const highlightColor = useMemo(() => {
    if (
      name.includes("Python") ||
      name.includes("Django") ||
      name.includes("Flask")
    ) {
      return "#306998"; // Python blue
    } else if (
      name.includes("JavaScript") ||
      name.includes("React") ||
      name.includes("Node")
    ) {
      return "#f0db4f"; // JavaScript yellow
    } else if (name.includes("Java")) {
      return "#5382a1"; // Java blue
    } else if (
      name.includes("SQL") ||
      name.includes("MySQL") ||
      name.includes("MongoDB")
    ) {
      return "#00758f"; // Database blue
    } else if (
      name.includes("TensorFlow") ||
      name.includes("PyTorch")
    ) {
      return "#ff6f00"; // ML/AI orange
    }
    return "#fa2720"; // default red
  }, [name]);

  // Pre-compute target scales to avoid creating new THREE.Vector3 objects every frame
  const hoverScale = useMemo(() => new THREE.Vector3(4, 4, 4), []);
  const normalScale = useMemo(() => new THREE.Vector3(2, 2, 2), []);
  
  // Memoize emissive colors
  const emissiveHover = useMemo(() => new THREE.Color(highlightColor), [highlightColor]);
  const emissiveNormal = useMemo(() => new THREE.Color("#000000"), []);

  // Change the mouse cursor on hover
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);

  // Material reference to avoid recreating material on each render
  const materialRef = useRef();

  // Animation on hover - optimized
  useFrame(() => {
    if (meshRef.current) {
      // Scale effect on hover using pre-computed vectors
      meshRef.current.scale.lerp(hovered ? hoverScale : normalScale, 0.1);

      // Only change emissive color on hover for glow effect
      if (materialRef.current) {
        materialRef.current.emissive.lerp(
          hovered ? emissiveHover : emissiveNormal,
          0.1
        );
      }
    }
  });

  // Memoize material to avoid recreating it on every render
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      emissive: "#000000",
      emissiveIntensity: 1
    });
    return mat;
  }, [texture]);

  useEffect(() => {
    materialRef.current = material;
  }, [material]);

  return (
    <Billboard position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => console.log(`Clicked on ${name}`)}
      >
        <planeGeometry args={[3, 3]} />
        <primitive object={material} attach="material" />
      </mesh>
    </Billboard>
  );
}

// Texture manager to handle efficient loading and caching
const TextureManager = {
  textures: {},
  
  preloadTextures(icons) {
    return Promise.all(
      icons.map(icon => 
        new Promise(resolve => {
          if (this.textures[icon]) {
            resolve(this.textures[icon]);
          } else {
            const loader = new THREE.TextureLoader();
            loader.load(icon, texture => {
              this.textures[icon] = texture;
              resolve(texture);
            });
          }
        })
      )
    );
  },
  
  getTexture(icon) {
    return this.textures[icon];
  }
};

function TechCloud({ count = techskills.length, radius = 15, scale = 1 }) {
  const [loaded, setLoaded] = useState(false);
  const groupRef = useRef();
  
  // Memoize skill positions to avoid recalculation
  const skillPositions = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (Math.ceil(Math.sqrt(count)) + 1);
    const thetaSpan = (Math.PI * 2) / Math.ceil(Math.sqrt(count));

    // Distribute skills evenly on a sphere
    let index = 0;
    for (let i = 1; i < Math.ceil(Math.sqrt(count)) + 1 && index < count; i++) {
      for (let j = 0; j < Math.ceil(Math.sqrt(count)) && index < count; j++) {
        const phi = phiSpan * i;
        const theta = thetaSpan * j;

        const position = new THREE.Vector3().setFromSpherical(
          spherical.set(radius, phi, theta)
        );

        // Add some randomness to positions
        position.x += (Math.random() - 0.5) * 3;
        position.y += (Math.random() - 0.5) * 3;
        position.z += (Math.random() - 0.5) * 3;

        temp.push({
          position,
          name: techskills[index].name,
          icon: techskills[index].icon,
        });
        index++;
      }
    }
    return temp;
  }, [count, radius]);

  // Preload all textures on component mount
  useEffect(() => {
    const icons = techskills.map(skill => skill.icon);
    TextureManager.preloadTextures(icons).then(() => {
      setLoaded(true);
    });
  }, []);

  // Optimize rotation to avoid unnecessary matrix calculations
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {loaded &&
        skillPositions.map((skill, index) => (
          <IconPlane
            key={index}
            position={skill.position}
            icon={skill.icon}
            name={skill.name}
          />
        ))}
    </group>
  );
}

function Skills() {
  // Use memo to prevent unnecessary re-renders
  const canvasProps = useMemo(() => ({
    dpr: [1, 2],
    camera: { position: [0, 0, 35], fov: 75 },
    gl: { powerPreference: 'high-performance', antialias: false, stencil: false, depth: false }
  }), []);
  
  return (
    <div className="h-full w-full">
      <Canvas className="aspect-video" {...canvasProps}>
        {/* Reduced light intensity for better performance */}
        <ambientLight intensity={1.5} />

        {/* Use Suspense for async loading */}
        <Suspense fallback={<CanvasLoader />}>
          <TechCloud radius={20} scale={0.8} />
        </Suspense>

        {/* Optimized controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableDamping={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

export default Skills;