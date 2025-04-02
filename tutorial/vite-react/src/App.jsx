import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import { Sparkles } from "@react-three/drei";

const RotatingCylinder = ({color }) => {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  })
  
  return (
    <mesh ref={meshRef} >
      <cylinderGeometry args={[1, 1, 1]} />
      <meshLambertMaterial 
        color={color || "#468585"} 
        emissive={color || "#468585"} 
        emissiveIntensity={0.2}
      />
      <Sparkles size={6} speed={0.002} count={100} scale={3} color={color || "#468585"} />
    </mesh>
  )
}

function App() {
  return (
    <>
      <Canvas style={{
        height: "100vh", 
        width: "100vw",
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center"
      }}>
        <OrbitControls enableZoom enablePan enableRotate />
        <directionalLight position={[1, 1, 1]} intensity={10} color="#9cdba6" />

        <color attach="background" args={["#f0f0f0"]} />
        <RotatingCylinder color="#468585" />
      </Canvas>
    </>
  )
}

export default App