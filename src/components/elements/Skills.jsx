import React, { useState, useEffect,useRef } from "react";
import { techskills } from "../data"; // Assuming this data structure exists

const TechSkillsCircle = () => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Calculate positions in a circle
  const calculateCirclePositions = () => {
    const count = techskills.length;
    const radius = 100; // Radius of the circle in pixels
    
    return techskills.map((skill, index) => {
      // Calculate position on circle
      const angle = (index / count) * 2 * Math.PI;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      return {
        ...skill,
        position: { x, y },
        angle: angle * (180 / Math.PI) // Convert to degrees for CSS rotation
      };
    });
  };
  
  const skills = calculateCirclePositions();

  // Get highlight color based on skill name
  const getHighlightColor = (name) => {
    if (name.includes("Python") || name.includes("Django") || name.includes("Flask")) {
      return "#306998"; // Python blue
    } else if (name.includes("JavaScript") || name.includes("React") || name.includes("Node")) {
      return "#f0db4f"; // JavaScript yellow
    } else if (name.includes("Java")) {
      return "#5382a1"; // Java blue
    } else if (name.includes("SQL") || name.includes("MySQL") || name.includes("MongoDB")) {
      return "#00758f"; // Database blue
    } else if (name.includes("TensorFlow") || name.includes("PyTorch")) {
      return "#ff6f00"; // ML/AI orange
    }
    return "#fa2720"; // default red
  };
  
  // Image preloading
  useEffect(() => {
    const preloadImages = async () => {
      const promises = skills.map(skill => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.src = skill.icon;
        });
      });
      
      await Promise.all(promises);
      setIsLoaded(true);
    };
    
    preloadImages();
  }, [skills]);
  
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="animate-spin-slow w-full h-full relative bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center">
      <div 
        className="relative w-40 h-40"
      >
        {skills.map((skill, index) => {
          const isHovered = hoveredSkill === index;
          
          return (
            <div
              key={index}
              className="absolute transition-all duration-300 cursor-pointer"
              style={{
                transform: `translate(-50%, -50%)  translate(${skill.position.x}px, ${skill.position.y}px)`,
                left: "50%",
                top: "50%"
              }}
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div 
                className={`animate-spin flex items-center justify-center ${isHovered ? 'scale-105' : 'scale-100'} transition-transform duration-300 p-2 rounded-full`}
                style={{
                  boxShadow: isHovered ? `0 0 10px ${getHighlightColor(skill.name)}` : "none"
                }}
              >
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="w-8 h-8 object-contain"
                  style={{
                    filter: isHovered ? `drop-shadow(0 0 3px ${getHighlightColor(skill.name)})` : "none"
                  }}
                />
              </div>
            
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechSkillsCircle;