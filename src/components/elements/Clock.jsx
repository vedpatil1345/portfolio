import React, { useState, useEffect } from "react";

const Clock = () => {
  const [currentNumber, setCurrentNumber] = useState(9);
  const [numbers, setNumbers] = useState([
    { value: 6, opacity: 0.2, bg: "dark:bg-green-600 bg-green-400" },
    { value: 7, opacity: 0.6, bg: "dark:bg-orange-700 bg-orange-300" },
    { value: 8, opacity: 0.8, bg: "dark:bg-blue-800 bg-blue-200" },
    { value: 9, opacity: 1, bg: "dark:bg-black bg-white" },
    { value: 0, opacity: 0.8, bg: "dark:bg-blue-800 bg-blue-200" },
    { value: 1, opacity: 0.6, bg: "dark:bg-orange-700 bg-orange-300" },
    { value: 2, opacity: 0.2, bg: "dark:bg-green-600 bg-green-400" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNumber((prev) => (prev === 0 ? 9 : prev - 1));
      setNumbers((prevNumbers) => {
        const newNumbers = prevNumbers.map((num) => ({
          ...num,
          value: num.value === 0 ? 9 : num.value - 1,
        }));
        return newNumbers;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentNumber]);

  return (
    <div className="flex items-center justify-center w-full bg-transparent mt-30">
      <div className="relative w-full max-w-2xl h-30">
        {numbers.map((num, index) => {
          // Calculate arc position with wider spacing
          const isCenter = index === 3;
          const angle = -45 + index * 15; // Start at -45 degrees, increment by 15 (wider spacing)
          const radius = 250; // Larger radius for the arc

          // Calculate position on the arc
          const xPos = Math.sin(angle * (Math.PI / 180)) * radius;
          const yPos =
            -Math.cos(angle * (Math.PI / 170)) * radius + radius * 0.7;

          // Size adjustments based on position
          const size = isCenter ? "w-14 h-24" : `w-14 h-14`;
          const shape = isCenter ? "rounded-4xl" : "rounded-full";

          return (
            <div
              key={index}
              className={`absolute flex items-center justify-center ${size} ${shape} ${
                num.bg
              }  ${
                isCenter
                  ? "border-4 border-gray-500"
                  : "border-2 border-gray-500"
              }`}
              style={{
                left: `calc(50% + ${xPos}px - ${"40px"})`,
                top: `calc(${!isCenter * 24}px + ${yPos}px)`,
                opacity: num.opacity,
              }}
            >
              <span className="dark:text-white text-black text-2xl font-bold">
                {num.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Clock;
