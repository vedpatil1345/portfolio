import * as THREE from "three";
import { useRef, useMemo, memo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// Performance-optimized HeroEarth component
export const HeroEarth = memo(function HeroEarth(props) {
  // Load and memoize the GLTF model
  const { nodes, materials } = useGLTF("/models/earth.gltf");
  
  // Create a reference for the rotating group
  const earthRef = useRef();
  
  // Clone and memoize materials to avoid modifying shared materials
  const iceMaterial = useMemo(() => materials.Lampd_Ice.clone(), [materials]);
  const waterMaterial = useMemo(() => {
    const mat = materials.watr.clone();
    mat.roughness = 0;
    return mat;
  }, [materials]);
  const landMaterial = useMemo(() => {
    const mat = materials.Lampd.clone();
    mat.color = new THREE.Color("lightgreen");
    return mat;
  }, [materials]);
  
  // Memoize geometries
  const iceGeometry = useMemo(() => nodes["URF-Height_Lampd_Ice_0"].geometry, [nodes]);
  const waterGeometry = useMemo(() => nodes["URF-Height_watr_0"].geometry, [nodes]);
  const landGeometry = useMemo(() => nodes["URF-Height_Lampd_0"].geometry, [nodes]);
  
  // Define initial rotation only once
  const initialRotation = useMemo(() => [3*Math.PI/2+0.2 , 0, 3*Math.PI / 2], []);
  
  // Optimize rotation calculation in animation frame
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });
  
  return (
    <group  {...props} dispose={null}>
      <group ref={earthRef}  rotation={initialRotation}>
        <mesh
          geometry={iceGeometry}
          material={iceMaterial}
        />
        <mesh
          geometry={waterGeometry}
          material={waterMaterial}
        />
        <mesh
          geometry={landGeometry}
          material={landMaterial}
        />
      </group>
    </group>
  );
});

// Preload the model to prevent loading jank
useGLTF.preload("/models/earth.gltf");