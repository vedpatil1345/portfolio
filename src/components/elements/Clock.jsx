import React, { useState, useEffect, useCallback, memo } from "react";

const NumberDisplay = memo(({ value, opacity, bg, size, shape, position, isCenter }) => {
  const { left, top } = position;
  
  return (
    <div
      className={`absolute flex items-center justify-center ${size} ${shape} ${bg} ${
        isCenter ? "border-4 border-gray-400 shadow-lg" : "border-2 border-gray-300"
      } transition-opacity duration-300`}
      style={{
        left,
        top,
        opacity,
      }}
    >
      <span className={`${isCenter ? "text-3xl" : "text-2xl"} font-bold dark:text-white text-black`}>
        {value}
      </span>
    </div>
  );
});

const Clock = () => {
  const [currentNumber, setCurrentNumber] = useState(9);
  const [numbers, setNumbers] = useState([
    { value: 6, opacity: 0.2, bg: "dark:bg-emerald-600 bg-emerald-400" },
    { value: 7, opacity: 0.4, bg: "dark:bg-amber-600 bg-amber-300" },
    { value: 8, opacity: 0.7, bg: "dark:bg-blue-700 bg-blue-300" },
    { value: 9, opacity: 1, bg: "dark:bg-gray-800 bg-white" },
    { value: 0, opacity: 0.7, bg: "dark:bg-blue-700 bg-blue-300" },
    { value: 1, opacity: 0.4, bg: "dark:bg-amber-600 bg-amber-300" },
    { value: 2, opacity: 0.2, bg: "dark:bg-emerald-600 bg-emerald-400" },
  ]);

  const updateNumbers = useCallback(() => {
    setCurrentNumber((prev) => (prev === 0 ? 9 : prev - 1));
    setNumbers((prevNumbers) => 
      prevNumbers.map((num) => ({
        ...num,
        value: num.value === 0 ? 9 : num.value - 1,
      }))
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(updateNumbers, 1000);
    return () => clearInterval(timer);
  }, [updateNumbers]);

  return (
    <div className=" flex items-center justify-center w-full bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg shadow-xl mt-6">
      <div className="relative w-full max-w-2xl h-64">
        {numbers.map((num, index) => {
          const isCenter = index === 3;
          const angle = -45 + index * 15;
          const radius = 240;

          // Calculate position on the arc
          const xPos = Math.sin(angle * (Math.PI / 180)) * radius;
          const yPos = -Math.cos(angle * (Math.PI / 170)) * radius + radius *0.8;

          const size = isCenter ? "w-14 h-22" : `w-12 h-12`;
          const shape = isCenter ? "rounded-4xl" : "rounded-full";
          
          const position = {
            left: `calc(50% + ${xPos}px - ${isCenter ? "32px" : "24px"})`,
            top: `calc(${!isCenter * 24}px + ${yPos}px)`
          };

          return (
            <NumberDisplay
              key={index}
              value={num.value}
              opacity={num.opacity}
              bg={num.bg}
              size={size}
              shape={shape}
              position={position}
              isCenter={isCenter}
            />
          );
        })}
        
        {/* Arc line decoration */}
        <div className="absolute w-5/6 h-3/4 border-t-2 border-gray-300 dark:border-gray-600 rounded-t-full" 
             style={{ left: '8%', top: '30%' }}>
        </div>
        
        {/* Center dot */}
        <div className="absolute w-4 h-4 bg-red-500 rounded-full"
             style={{ left: 'calc(50% - 8px)', top: 'calc(50% + 30px)' }}>
        </div>
      </div>
    </div>
  );
};

export default memo(Clock);