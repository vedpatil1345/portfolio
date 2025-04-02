import { useRef, useMemo, memo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Grid,
} from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";

// Memoized Grid component to prevent unnecessary renders
const MemoizedGrid = memo(({ position, color }) => (
  <Grid
    renderOrder={-1}
    position={position}
    infiniteGrid
    sectionSize={5}
    sectionThickness={1.5}
    sectionColor={color}
    fadeDistance={70}
  />
));

// Performance-optimized Kamdo component
const Kamdo = memo(function Kamdo(props) {
  const head = useRef();
  const stripe = useRef();
  const light = useRef();
  
  // Load model only once
  const { nodes, materials } = useGLTF(
    "/models/Drone/s2wt_kamdo_industrial_divinities-transformed.glb"
  );
  
  // Pre-compute any static values
  const bodyGeometry = useMemo(() => nodes.body001.geometry, [nodes.body001]);
  const headGeometry = useMemo(() => nodes.head001.geometry, [nodes.head001]);
  const stripeGeometry = useMemo(() => nodes.stripe001.geometry, [nodes.stripe001]);
  const bodyMaterial = useMemo(() => materials.Body.clone(), [materials.Body]);
  const headMaterial = useMemo(() => materials.Head.clone(), [materials.Head]);
  
  // Create the stripe material once
  const stripeMaterial = useMemo(() => new THREE.MeshBasicMaterial({ toneMapped: false }), []);
  
  useFrame((state, delta) => {
    // Optimize sine calculation
    const t = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2;
    
    // Set color values directly instead of creating new color objects
    stripe.current.color.r = 2 + t * 20;
    stripe.current.color.g = 2;
    stripe.current.color.b = 20 + t * 50;
    
    // Optimize rotation calculation
    const randomRotationY = Math.sin(state.clock.elapsedTime);
    
    // Only apply rotation if significant change
    if (Math.abs(head.current.rotation.y - randomRotationY) > 0.01) {
      // Apply easing only to Y-axis rotation
      easing.damp(head.current.rotation, 'y', randomRotationY, 0.8, delta);
    }
    
    // Optimize light intensity updates
    light.current.intensity = 1 + t * 25;
  });
  
  return (
    <group {...props}>
      <mesh geometry={bodyGeometry} material={bodyMaterial} />
      <group ref={head}>
        <mesh geometry={headGeometry} material={headMaterial} />
        <mesh geometry={stripeGeometry} material={stripeMaterial}>
          <primitive object={stripeMaterial} ref={stripe} />
          <pointLight
            ref={light}
            intensity={1}
            color={[10, 2, 5]}
            distance={1.2}
          />
        </mesh>
      </group>
    </group>
  );
});

// Main Drone component memoized for performance
const Drone = memo(function Drone(props) {
  // Pre-compute grid color and position
  const gridPosition = useMemo(() => [0, -1.85, 0], []);
  const gridColor = useMemo(() => [0.1, 0.2, 10], []);
  
  return (
    <group {...props} dispose={null}>
      <Kamdo rotation={[0, Math.PI + 0.2, 0]} {...props} />
      <MemoizedGrid position={gridPosition} color={gridColor} />
    </group>
  );
});

// Ensure model is preloaded
useGLTF.preload(
  "/models/Drone/s2wt_kamdo_industrial_divinities-transformed.glb"
);

export default Drone;