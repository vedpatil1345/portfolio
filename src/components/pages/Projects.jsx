import React, { useState, Suspense, useCallback, useMemo } from "react";
import { projects } from "../data";
import { ExternalLink, Github } from "lucide-react";
import Loader from "../elements/Loader";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import ProjectTV from "../elements/ProjectTV.jsx";
import { useTheme } from "../theme-provider.jsx";

// Memoized ProjectNavDots component
const ProjectNavDots = React.memo(({ projects, currentIndex, onSelectProject }) => {
  return (
    <div className="flex space-x-2">
      {projects.map((_, idx) => (
        <button
          key={idx}
          onClick={() => onSelectProject(idx)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            idx === currentIndex
              ? "bg-blue-600 dark:bg-blue-400 w-6"
              : "bg-gray-300 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600"
          }`}
          aria-label={`Go to project ${idx + 1}`}
        />
      ))}
    </div>
  );
});

// Memoized ProjectCard component
const ProjectCard = React.memo(({ 
  project, 
  projectNumber, 
  totalProjects, 
  isActive, 
  distance = 5
  
}) => {
  // Calculate transform values based on distance from active card
  const getTransformStyles = () => {
    const scale = isActive ? 1 : 0.95 - (Math.abs(distance) * 0.03);
    const translateY = isActive ? 0 : distance * 5; // Small Y offset for stack effect
    const translateZ = isActive ? 0 : -20 * Math.abs(distance);
    const opacity = isActive ? 1 : 0.7 - (Math.abs(distance) * 0.15);
    const translateX = distance * 10; // Horizontal offset for stacked appearance
    const rotate = distance * -2; // Small rotation for a more realistic stack
    
    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale}) rotate(${rotate}deg)`,
      opacity: opacity > 0.1 ? opacity : 0.1, // Ensure cards don't completely disappear
      zIndex: isActive ? 10 : 10 - Math.abs(distance)
    };
  };
  
  return (
    <div 
      className={`flex flex-col bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-6 
        absolute w-full transition-all duration-500 ease-in-out
        ${isActive ? 'shadow-xl' : 'shadow-md'}`}
      style={getTransformStyles()}
    >
      {/* Project Content */}
      <div>
        <div className="flex items-center">
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">
            Project {projectNumber} of {totalProjects}
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 capitalize">
          {project.name}
        </h2>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-y-auto h-64 scrollbar-hide">
            {project.description}
          </div>
        </div>

        {isActive && (
          <div className="flex space-x-4 mt-6">
            <a
              href={project.gitLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 text-gray-900 dark:text-gray-100"
            >
              <Github className="h-5 w-5 mr-2" />
              <span>Source Code</span>
            </a>

            <a
              href={project.liveLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700 transition-colors duration-300 text-white"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              <span>Live Demo</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
});

// Memoized TechStack component
const TechStack = React.memo(({ techStack }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-1 min-h-16">
      {techStack && techStack.map((tech, idx) => (
        <span
          key={idx}
          className="px-3 py-1 h-fit bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm"
        >
          {tech}
        </span>
      ))}
    </div>
  );
});

// Modified ProjectPreview component with conditional rendering based on screen size
const ProjectPreview = React.memo(({ project }) => {
  const { theme } = useTheme();
  // State to track viewport width
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Effect to handle resize events
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoize camera settings
  const cameraProps = useMemo(() => ({
    position: [0, -50, 50],
    fov: 45
  }), []);

  // Memoize OrbitControls settings
  const orbitControlsProps = useMemo(() => ({
    enableZoom: true,
    enablePan: false,
    enableRotate: false,
    minDistance: 50,
    maxDistance: 200,
    target: [0, 10, -10],
    minPolarAngle: Math.PI / 2,
    maxPolarAngle: Math.PI / 2
  }), []);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Preview</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Technologies Used
        </span>
      </div>

      <TechStack techStack={project.techStack} />

      <div className="flex-grow flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {isMobile ? (
          // Image for mobile
          <div className="w-full h-full flex items-center justify-center">
            <Suspense fallback={'LoadingManager....'}>
              <img
                src={project.image}
                alt={project.name}
                className="max-w-full max-h-full object-cover rounded-lg "// Flip the image horizontally
              />
            </Suspense>
          </div>
        ) : (
          // 3D model for desktop
          <Canvas>
            <Suspense fallback={<Loader />}>
              <Environment preset={theme === "dark" ? "night" : "park"} background={false} />
              <PerspectiveCamera makeDefault {...cameraProps} />
              <ambientLight intensity={2} />
              <directionalLight position={[10, 10, 10]} intensity={2} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
              <OrbitControls {...orbitControlsProps} />
              <ProjectTV position={[0, -45, 0]} rotation={[0, Math.PI * 1.9, 0]} scale={32} image={project.image} />
            </Suspense>
          </Canvas>
        )}
      </div>
    </div>
  );
});

const Projects = () => {
  const [projectIndex, setProjectIndex] = useState(0);
  
  // Function to calculate relative index and distance for card stacking
  const getRelativeIndex = (index, currentIndex, totalLength) => {
    const distance = index - currentIndex;
    
    // Handle wrapping for circular navigation
    if (distance > totalLength / 2) return distance - totalLength;
    if (distance < -totalLength / 2) return distance + totalLength;
    
    return distance;
  };

  // Memoize the current project
  const currentProject = useMemo(() => projects[projectIndex], [projectIndex]);

  // useCallback for navigation handlers
  const handleLeftClick = useCallback(() => {
    setProjectIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  }, []);

  const handleRightClick = useCallback(() => {
    setProjectIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const handleSelectProject = useCallback((index) => {
    setProjectIndex(index);
  }, []);

  // Limit number of visible cards on each side
  const visibleCards = 2;

  return (
    <div className="w-[95vw] mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white mb-6 text-center md:text-left">
        Projects
      </h1>

      {/* Project Navigation Dots */}
      <div className="flex justify-center mb-8">
        <ProjectNavDots
          projects={projects}
          currentIndex={projectIndex}
          onSelectProject={handleSelectProject}
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-[60%_40%] gap-6 lg:gap-8">
          {/* Project Details Card Container */}
          <div className="relative h-[32rem] flex items-center justify-center perspective-1000">
            {/* Navigation Arrows */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between z-30 pointer-events-none">
              <button
                onClick={handleLeftClick}
                className="pointer-events-auto bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform -translate-x-1/2"
                aria-label="Previous project"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={handleRightClick}
                className="pointer-events-auto bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform translate-x-1/2"
                aria-label="Next project"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Render all visible projects in the stack */}
            {projects.map((project, idx) => {
              const distance = getRelativeIndex(idx, projectIndex, projects.length);
              
              // Only render cards within our visible range
              if (Math.abs(distance) > visibleCards) return null;
              
              return (
                <ProjectCard
                  key={idx}
                  project={project}
                  projectNumber={idx + 1}
                  totalProjects={projects.length}
                  isActive={idx === projectIndex}
                  distance={distance}
                  onPrevClick={handleLeftClick}
                  onNextClick={handleRightClick}
                />
              );
            })}
          </div>

          {/* Project Preview Card */}
          <ProjectPreview project={currentProject} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Projects);