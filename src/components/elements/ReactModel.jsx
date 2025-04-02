import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

export function ReactModel(props) {
  // Load the model only once
  const { nodes } = useGLTF("/models/React/scene.gltf");

  // Create a reference for the React logo mesh
  const reactLogoRef = useRef();

  // Create the material only once with useMemo
  const material = useMemo(() => {
    return new MeshStandardMaterial({
      color: "#00ffff",
      emissive: "cyan",
      emissiveIntensity: 0.2,
      toneMapped: false,
    });
  }, []);

  // Memoize position, rotation, and scale
  const position = useMemo(() => [0, 7.935, 0], []);
  const rotation = useMemo(() => [-Math.PI / 2, Math.PI / 2, 0], []);
  const scale = useMemo(() => [39.166, 39.166, 52.734], []);
  
  // Memoize outer group rotations and scale
  const outerRotation = useMemo(() => [-Math.PI / 2, 0, -Math.PI / 2], []);
  const innerRotation = useMemo(() => [Math.PI / 2, 0, 0], []);
  const innerScale = useMemo(() => 0.01, []);

  // Memoize the geometry to prevent unnecessary computations
  const geometry = useMemo(() => nodes["React-Logo_Material002_0"].geometry, [nodes]);

  // Optimize the animation by using delta time
  useFrame((_, delta) => {
    if (reactLogoRef.current) {
      // Use delta time for smoother, frame-rate independent rotation
      reactLogoRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <group {...props} dispose={null}>
      <group rotation={outerRotation}>
        <group rotation={innerRotation} scale={innerScale}>
          <mesh
            ref={reactLogoRef}
            castShadow
            receiveShadow
            geometry={geometry}
            position={position}
            rotation={rotation}
            scale={scale}
            material={material}
          />
        </group>
      </group>
    </group>
  );
}

// Preload with a draco decoder option if your model is draco compressed
useGLTF.preload("/models/React/scene.gltf");