import {
  PerspectiveCamera,
  Environment,
  Stars,
  Float,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useMemo, memo, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { MyRoom } from "../elements/MyRoom";
import CanvasLoader from "../elements/Loader";
import { useTheme } from "../theme-provider";
import * as THREE from "three";
import HeroCamera from "../elements/HeroCamera";
import { Car } from "../elements/Car";
import { Sky } from "../elements/Sky";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { ReactModel } from "../elements/ReactModel";
import { HeroEarth } from "../elements/HeroEarth";
import Drone from "../elements/Drone";
import { calculateSizes } from "../data";

// Preload models to avoid jank during rendering
useGLTF.preload("../models/room.glb"); // Add paths to your actual models
useGLTF.preload("../models/car.glb");
useGLTF.preload("../models/react.glb");

// Memoize scene elements to prevent unnecessary re-renders
const MemoizedRoom = memo(MyRoom);
const MemoizedCar = memo(Car);
const MemoizedReactModel = memo(ReactModel);
const MemoizedHeroEarth = memo(HeroEarth);
const MemoizedDrone = memo(Drone);
const MemoizedSky = memo(Sky);

// Separate component for stars to prevent re-renders when theme doesn't change
const StarsComponent = memo(() => (
  <Stars saturation={0} count={500} speed={1} />
));

// Effects component to avoid duplicate EffectComposers
const SceneEffects = memo(({ lightRefs, objectRefs, droneRef }) => {
  return (
    <EffectComposer multisampling={0} frameBufferType={THREE.HalfFloatType}>
      <SelectiveBloom
        lights={lightRefs}
        selection={objectRefs}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={1.1}
      />
      <SelectiveBloom
        lights={lightRefs}
        selection={[droneRef]}
        luminanceThreshold={2}
        mipmapBlur
      />
    </EffectComposer>
  );
});

// Optimize the button component with memo
const Button = memo(({ name, isBeam = false, containerClass }) => {
  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <button
      onClick={scrollToAbout}
      className={`flex gap-4 items-center justify-center cursor-pointer p-3 rounded-md bg-white dark:bg-slate-600 transition-all active:scale-95 text-black dark:text-white mx-auto ${containerClass}`}
    >
      {isBeam && (
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-700 dark:bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-800 dark:bg-green-500"></span>
        </span>
      )}
      {name}
    </button>
  );
});

function Hero() {
  const { theme } = useTheme();
  const ismobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // Use useMemo to prevent recalculation on every render
  const sizes = useMemo(
    () => calculateSizes(ismobile, isTablet),
    [ismobile, isTablet]
  );

  const droneRef = useRef();
  const ref = useRef();
  const lightRef1 = useRef();
  const lightRef2 = useRef();

  // Memoize background color to prevent recreating the color object
  const backgroundColor = useMemo(
    () => new THREE.Color(theme === "light" ? "white" : "black"),
    [theme]
  );

  return (
    <section className="h-screen max-w-screen flex flex-col relative">
      <div className="mx-auto flex flex-col mt-36 z-10 relative w-full h-full">
        <p className="text-2xl md:text-3xl lg:text-5xl text-center">
          Hi, I am Ved <span className="waving-hand">👋</span>
        </p>
        <p className="gradient-heading">Learn Grow & Inspire.</p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        <Canvas
          shadows={!ismobile}
          className="h-full w-full z-0"
          dpr={[1, ismobile ? 1.5 : 2]}
          performance={{ min: 0.5 }}
          // Add these to ensure pointer events work
          eventSource={document.getElementById("root")} // Or another parent element
          eventPrefix="client"
        >
          <Suspense fallback={<CanvasLoader />}>
            {/* Reduced quality preset for mobile */}
            <Environment preset={theme === "light" ? "warehouse" : "sunset"} />
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />

            {/* Reduced light intensity for better performance */}
            <ambientLight intensity={ismobile ? 0.8 : 1} ref={lightRef1} />
            <directionalLight
              position={[10, 10, 10]}
              intensity={ismobile ? 0.4 : 0.5}
              castShadow={!ismobile}
              shadow-mapSize-width={ismobile ? 512 : 1024}
              shadow-mapSize-height={ismobile ? 512 : 1024}
              ref={lightRef2}
            />

            <HeroCamera isMobile={ismobile}>
              <MemoizedRoom
                ref={ref}
                position={sizes.deskPosition}
                rotation={sizes.deskRotation}
                scale={sizes.deskScale}
                castShadow={!ismobile}
                receiveShadow={!ismobile}
              />
            </HeroCamera>

            <color attach="background" args={[backgroundColor]} />

            {theme === "light" ? <MemoizedSky /> : <StarsComponent />}

            <group position={sizes.carPosition}>
              {ismobile ? (
                <Float speed={1} rotationIntensity={0.7} floatIntensity={0.7}>
                  <MemoizedCar
                    ref={ref}
                    rotation={sizes.carRotation}
                    scale={sizes.carScale}
                    castShadow={false}
                    receiveShadow={false}
                  />
                </Float>
              ) : (
                <MemoizedCar
                  ref={ref}
                  rotation={sizes.carRotation}
                  scale={sizes.carScale}
                  castShadow
                  receiveShadow
                />
              )}
            </group>

            {/* Load non-critical elements with a separate suspense boundary */}
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.2} floatIntensity={0.7}>
                <MemoizedReactModel
                  ref={ref}
                  position={sizes.atomPosition}
                  rotation={sizes.atomRotation}
                  scale={sizes.atomScale}
                />
              </Float>
                <Float speed={2} rotationIntensity={0.1} floatIntensity={0.7}>
                  <MemoizedHeroEarth
                    ref={ref}
                    position={sizes.earthPosition}
                    scale={sizes.earthScale}
                  />
                </Float>
              

              <group ref={droneRef}>
                <MemoizedDrone
                  position={sizes.dronePosition}
                  scale={sizes.droneScale}
                />
              </group>
            </Suspense>

            {/* Combined effects for better performance */}
            
              <SceneEffects
                lightRefs={[lightRef1, lightRef2]}
                objectRefs={ref}
                droneRef={droneRef}
              />
            
          </Suspense>
        </Canvas>
      </div>
      <div className="absolute bottom-28 md:bottom-18 left-0 right-0 w-full z-20 sm:px-10 px-5">
        <Button
          name="Let's work together"
          isBeam
          containerClass="sm:w-fit w-full sm:min-w-96"
        />
      </div>
    </section>
  );
}
export default memo(Hero);
