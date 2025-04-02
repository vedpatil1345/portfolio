import React, { useMemo, memo } from "react";
import { useGLTF, Instances, Instance } from "@react-three/drei";
import * as THREE from "three";

// Use instancing for repeated geometries with different transforms
const MeshGroup = memo(({ nodes, materials, transforms, geometryKey, materialKey, shadowProps }) => {
  // If there's no data, don't render anything
  if (!transforms || transforms.length === 0) return null;
  
  return (
    <Instances limit={transforms.length} geometry={nodes[geometryKey].geometry} material={materials[materialKey]}>
      {transforms.map((transform, i) => (
        <Instance 
          key={i} 
          position={transform.position} 
          rotation={transform.rotation} 
          scale={transform.scale} 
          {...shadowProps}
        />
      ))}
    </Instances>
  );
});

// Create optimized single mesh instance
const OptimizedMesh = memo(({ geometry, material, position, rotation, scale, shadowProps }) => (
  <mesh
    geometry={geometry}
    material={material}
    position={position}
    rotation={rotation}
    scale={scale}
    {...shadowProps}
  />
));

export const MyRoom = memo((props) => {
  const { nodes, materials } = useGLTF("/models/MyRoom/scene.gltf");
  
  // Decide whether to use shadows based on props
  const shadowProps = useMemo(() => ({
    castShadow: props.castShadow !== false,
    receiveShadow: props.receiveShadow !== false
  }), [props.castShadow, props.receiveShadow]);
  
  // Group similar meshes for instancing optimization
  const chairGroup = useMemo(() => [
    {
      position: [16.678, 8.418, 24.507],
      rotation: [-Math.PI, -0.592, -Math.PI],
      scale: [2.549, 0.243, 2.549]
    }
  ], []);
  
  const laptopGroup = useMemo(() => [
    {
      position: [-18.454, 15.918, 9.192],
      rotation: [0, 0.926, -Math.PI],
      scale: [-5.14, 0.147, 3.341]
    }
  ], []);
  
  const keyboardGroup = useMemo(() => [
    {
      position: [-2.333, 15.958, 2.159],
      rotation: [0, 0.005, 0],
      scale: [5.607, 0.175, 1.728]
    }
  ], []);
  
  // Optimize individual meshes by memoizing their properties
  const individualMeshes = useMemo(() => [
    {
      geometryKey: "Object_11",
      materialKey: "COMPUTER-0",
      position: [-18.152, 5.799, 9.513],
      rotation: [0, 0, 0],
      scale: [2.327, 5.804, 5.98]
    },
    {
      geometryKey: "Object_13",
      materialKey: "1COMPUTER-0",
      position: [-24.287, 5.799, 15.387],
      rotation: [0, 0, 0],
      scale: [2.327, 5.804, 5.98]
    },
    {
      geometryKey: "Object_15",
      materialKey: "DESK-0",
      position: [0, 15.452, 0],
      rotation: [0, 0, 0],
      scale: [29.541, 0.336, 8.492]
    },
    {
      geometryKey: "Object_17",
      materialKey: "MAT-0",
      position: [0, 0, 14.147],
      rotation: [0, 0, 0],
      scale: [46.718, 46.718, 26.649]
    },
    {
      geometryKey: "Object_19",
      materialKey: "SCREEN-0",
      position: [0, 21.761, -6.007],
      rotation: [Math.PI / 2, 0, 0],
      scale: [9.123, 4.323, 5.089]
    },
    {
      geometryKey: "Object_21",
      materialKey: "2PIC-0",
      position: [0, 21.761, -5.754],
      rotation: [Math.PI / 2, 0, 0],
      scale: [8.964, 4.204, 4.87]
    },
    {
      geometryKey: "Object_23",
      materialKey: "1PIC-0",
      position: [-16.887, 21.761, -0.693],
      rotation: [Math.PI / 2, 0, -0.57],
      scale: [8.964, 4.204, 4.87]
    },
    {
      geometryKey: "Object_25",
      materialKey: "3PIC-0",
      position: [16.987, 21.761, -0.811],
      rotation: [Math.PI / 2, 0, 0.552],
      scale: [8.964, 4.204, 4.87]
    },
    {
      geometryKey: "Object_27",
      materialKey: "BASS-0",
      position: [0, 4.992, 0.553],
      rotation: [0, 0, 0],
      scale: [5.47, 5, 3.905]
    },
    {
      geometryKey: "Object_29",
      materialKey: "SPEAKER-0",
      position: [-27.707, 18.537, 8.063],
      rotation: [0, 0.588, 0],
      scale: [1.076, 1.75, 0.848]
    },
    {
      geometryKey: "Object_42",
      materialKey: "MOUSE-0",
      position: [7.641, 16.001, 4.809],
      rotation: [0, 0.415, 0],
      scale: [0.751, 0.486, 1.161]
    },
    {
      geometryKey: "Object_44",
      materialKey: "MOUSEPAD-0",
      position: [7.625, 14.269, 3.664],
      rotation: [0, 0, 0],
      scale: 3.11
    }
  ], []);
  
  // Chair component parts
  const chairParts = useMemo(() => [
    { geometryKey: "Object_4", materialKey: "CHAIR-0" },
    { geometryKey: "Object_5", materialKey: "WHEEL-0" },
    { geometryKey: "Object_6", materialKey: "WHEEL-CAP-0" },
    { geometryKey: "Object_7", materialKey: "WHEEL-NUT-0" },
    { geometryKey: "Object_8", materialKey: "CHAIR-LEGS-0" },
    { geometryKey: "Object_9", materialKey: "CHAIR-COVER-0" }
  ], []);
  
  // Laptop component parts
  const laptopParts = useMemo(() => [
    { geometryKey: "Object_31", materialKey: "LAPTOP-0" },
    { geometryKey: "Object_32", materialKey: "1KB-BASE-0" },
    { geometryKey: "Object_33", materialKey: "1KEYS-0" },
    { geometryKey: "Object_34", materialKey: "SCREEN-0.001" },
    { geometryKey: "Object_35", materialKey: "SIGN-0" },
    { geometryKey: "Object_36", materialKey: "TAG-0" }
  ], []);
  
  // Keyboard component parts
  const keyboardParts = useMemo(() => [
    { geometryKey: "Object_38", materialKey: "2KB-0" },
    { geometryKey: "Object_39", materialKey: "1KB-BASE-0.001" },
    { geometryKey: "Object_40", materialKey: "1KEYS-0.001" }
  ], []);
  
  return (
    <group {...props} dispose={null}>
      {/* Render chair group */}
      {chairGroup.map((chairTransform, index) => (
        <group 
          key={`chair-${index}`}
          position={chairTransform.position}
          rotation={chairTransform.rotation}
          scale={chairTransform.scale}
        >
          {chairParts.map((part, i) => (
            <OptimizedMesh
              key={`chair-part-${i}`}
              geometry={nodes[part.geometryKey].geometry}
              material={materials[part.materialKey]}
              shadowProps={shadowProps}
            />
          ))}
        </group>
      ))}
      
      {/* Render laptop group */}
      {laptopGroup.map((laptopTransform, index) => (
        <group 
          key={`laptop-${index}`}
          position={laptopTransform.position}
          rotation={laptopTransform.rotation}
          scale={laptopTransform.scale}
        >
          {laptopParts.map((part, i) => (
            <OptimizedMesh
              key={`laptop-part-${i}`}
              geometry={nodes[part.geometryKey].geometry}
              material={materials[part.materialKey]}
              shadowProps={shadowProps}
            />
          ))}
        </group>
      ))}
      
      {/* Render keyboard group */}
      {keyboardGroup.map((keyboardTransform, index) => (
        <group 
          key={`keyboard-${index}`}
          position={keyboardTransform.position}
          rotation={keyboardTransform.rotation}
          scale={keyboardTransform.scale}
        >
          {keyboardParts.map((part, i) => (
            <OptimizedMesh
              key={`keyboard-part-${i}`}
              geometry={nodes[part.geometryKey].geometry}
              material={materials[part.materialKey]}
              shadowProps={shadowProps}
            />
          ))}
        </group>
      ))}
      
      {/* Render individual meshes */}
      {individualMeshes.map((mesh, index) => (
        <OptimizedMesh
          key={`mesh-${index}`}
          geometry={nodes[mesh.geometryKey].geometry}
          material={materials[mesh.materialKey]}
          position={mesh.position}
          rotation={mesh.rotation}
          scale={mesh.scale}
          shadowProps={shadowProps}
        />
      ))}
    </group>
  );
});

// Ensure model is preloaded
useGLTF.preload("/models/MyRoom/scene.gltf");