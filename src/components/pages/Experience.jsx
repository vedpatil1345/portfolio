import React, { useState, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CanvasLoader from '../elements/Loader';
import { workExperiences } from '../data';
import { Ved } from '../elements/Ved';

// Memoized ExperienceNavDots component
const ExperienceNavDots = React.memo(({ experiences, currentIndex, onSelectExperience }) => {
  return (
    <div className="flex space-x-2">
      {experiences.map((_, idx) => (
        <button
          key={idx}
          onClick={() => onSelectExperience(idx)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex
            ? "bg-blue-600 dark:bg-blue-400 w-6"
            : "bg-gray-300 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600"
            }`}
          aria-label={`Go to experience ${idx + 1}`}
        />
      ))}
    </div>
  );
});

// Memoized ExperienceCard component
const ExperienceCard = React.memo(({
  experience,
  experienceNumber,
  totalExperiences,
  isActive,
  distance = 0,
  onMouseEnter,

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
      onMouseEnter={() => onMouseEnter(experience.animation.toLowerCase())}

    >
      {/* Experience Content */}
      <div>
        <div className="flex items-center justify-between">
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">
            Experience {experienceNumber} of {totalExperiences}
          </div>
          <div className="work-content_logo h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-full p-2 flex items-center justify-center">
            <img className="w-full h-full object-contain rounded-full" src={experience.icon} alt={experience.name} />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2">
          {experience.name}
        </h2>

        <div className="text-blue-600 dark:text-blue-400 font-medium mb-4">
          {experience.pos} — <span className="text-gray-600 dark:text-gray-400">{experience.duration}</span>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-y-auto h-40 scrollbar-hide">
            <p className="text-gray-800 dark:text-gray-200">{experience.title}</p>
            {/* Additional description could be added here */}
            {experience.description && (
              <ul className="mt-4 space-y-2">
                {experience.description.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {isActive && experience.skills && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

const Experience = () => {
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [animationName, setAnimationName] = useState('idle');

  // Function to calculate relative index and distance for card stacking
  const getRelativeIndex = (index, currentIndex, totalLength) => {
    const distance = index - currentIndex;

    // Handle wrapping for circular navigation
    if (distance > totalLength / 2) return distance - totalLength;
    if (distance < -totalLength / 2) return distance + totalLength;

    return distance;
  };

  // useCallback for navigation handlers
  const handleLeftClick = useCallback(() => {
    setExperienceIndex((prevIndex) =>
      prevIndex === 0 ? workExperiences.length - 1 : prevIndex - 1
    );
  }, []);

  const handleRightClick = useCallback(() => {
    setExperienceIndex((prevIndex) =>
      prevIndex === workExperiences.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const handleSelectExperience = useCallback((index) => {
    setExperienceIndex(index);
  }, []);

  const handleMouseEnter = useCallback((animation) => {
    setAnimationName(animation);
    setTimeout(() => {
      setAnimationName('idle');
    }, 3000); // Reset animation after 2 seconds
  }, []);

  // Limit number of visible cards on each side
  const visibleCards = 2;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white mb-6 text-center md:text-left">
        My Work Experience
      </h1>

      {/* Experience Navigation Dots */}
      <div className="flex justify-center mb-16 sm:mb-8">
        <ExperienceNavDots
          experiences={workExperiences}
          currentIndex={experienceIndex}
          onSelectExperience={handleSelectExperience}
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-[70%_30%] gap-6 lg:gap-8">
          {/* Experience Details Card Container */}
          <div className="relative h-[32rem] flex items-center justify-center perspective-1000">
            {/* Navigation Arrows */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between z-30 pointer-events-none">
              <button
                onClick={handleLeftClick}
                className="pointer-events-auto bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform -translate-x-1/2"
                aria-label="Previous experience"
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
                aria-label="Next experience"
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

            {/* Render all visible experiences in the stack */}
            {workExperiences.map((experience, idx) => {
              const distance = getRelativeIndex(idx, experienceIndex, workExperiences.length);

              // Only render cards within our visible range
              if (Math.abs(distance) > visibleCards) return null;

              return (
                <ExperienceCard
                  key={idx}
                  experience={experience}
                  experienceNumber={idx + 1}
                  totalExperiences={workExperiences.length}
                  isActive={idx === experienceIndex}
                  distance={distance}
                  onMouseEnter={handleMouseEnter}
                />
              );
            })}
          </div>

          {/* 3D Developer Model */}
          <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 hidden sm:flex flex-col">


            <div className=" flex-grow flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden h-60">
              <Canvas>
                <ambientLight intensity={3.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
                <Suspense fallback={<CanvasLoader />}>
                  <Ved position-y={-3} scale={3} animationName={animationName} />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Experience);