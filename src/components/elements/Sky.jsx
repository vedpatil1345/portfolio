import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import React from "react";
import { Cloud, Clouds } from "@react-three/drei";
import { Sky as SkyImpl } from "@react-three/drei";
import { Group } from "three";

export function Sky() {
  const ref = React.useRef(null);
  const cloud0 = React.useRef(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 2) / 36;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 2) / 36;
    }
    if (cloud0.current) {
      cloud0.current.rotation.y -= delta / 2000; // Slower rotation
    }
  });

  return (
    <>
      <SkyImpl
        distance={500}
        scale={10000}
        rayleigh={2}
        turbidity={3}
        sunPosition={[0,0, -1]}
        
      />
      {/* Clouds far in the background */}
      <group ref={ref} position={[0, -20, -50]} renderOrder={-1} scale={10}>
        <color attach="background" args={["#ffffff"]} />
        <Clouds material={THREE.MeshLambertMaterial} limit={300}>
          <Cloud
            ref={cloud0}
            opacity={0.5}
            bounds={[8, 2, 1]}
            color="#ffffff"
            position={[0, 0, -10]}
          />
          <Cloud
            bounds={[10, 2, 10]}
            color="#ffffff"
            opacity={0.5}
            seed={2}
            position={[25, 0, -20]}
          />
          <Cloud
            bounds={[12, 2, 10]}
            color="#ffffff"
            opacity={0.5}
            seed={3}
            position={[-25, 0, -30]}
          />
          <Cloud
            bounds={[10, 2, 10]}
            color="#ffffff"
            opacity={0.5}
            seed={4}
            position={[0, 0, -30]}
          />
          <Cloud
            bounds={[12, 2, 10]}
            color="#ffffff"
            opacity={0.5}
            seed={5}
            position={[0, 0, -10]}
          />
          <Cloud
            concentrate="outside"
            growth={300}
            color="#ffffff"
            opacity={0.1}
            seed={69}
            bounds={250}
            volume={200}
            position={[0, 0, 0]}
          />
        </Clouds>
      </group>
    </>
  );
}
