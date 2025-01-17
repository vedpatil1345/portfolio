import React, { useMemo, useCallback } from 'react';
interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  numberOfElements?: number;
}

const GradientBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  className = '',
  numberOfElements = 50,
}) => {
  // Memoize the random number generator to ensure consistent values
  const generateRandomValue = useCallback((min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }, []);

  // Memoize floating elements with pre-computed styles
  const floatingElements = useMemo(() => {
    return Array.from({ length: numberOfElements }).map((_, index) => ({
      id: index,
      style: {
        left: `${generateRandomValue(0, 100)}%`,
        top: `${generateRandomValue(0, 100)}%`,
        opacity: generateRandomValue(0.1, 0.2),
        animationDuration: `${generateRandomValue(10, 20)}s`,
        animationDelay: `${generateRandomValue(-10, 0)}s`,
        transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
      }
    }));
  }, [numberOfElements, generateRandomValue]);

  // Memoize gradient styles to prevent recreation
  const gradientStyles = useMemo(() => ({
    backgroundImage: `
      radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(96, 165, 250, 0.06) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)
    `
  }), []);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden will-change-transform ${className}`}>
      {/* Base gradient background */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-50 
                   dark:from-indigo-950 dark:via-slate-900 dark:to-slate-950 
                   transition-colors duration-700"
        aria-hidden="true"
      />

      {/* Glow effect */}
      <div 
        className="fixed inset-0 opacity-50 dark:opacity-30"
        style={gradientStyles}
        aria-hidden="true"
      />

      {/* Optimized floating elements container */}
      <div 
        className="fixed inset-0 pointer-events-none" 
        style={{ contain: 'strict' }}
        aria-hidden="true"
      >
        {floatingElements.map(({ id, style }) => (
          <div
            key={id}
            className="absolute w-8 h-8 rounded-full border-4 
                       bg-blue-700/90 border-blue-500/90
                       dark:bg-blue-300/90 dark:border-blue-400/90
                       blur-sm transition-colors duration-700"
            style={{
              ...style,
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              animationName: 'gentle-float',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          />
        ))}
      </div>

      {/* Content wrapper with optimized stacking context */}
      <div className="relative z-10 transform-gpu">
        {children}
      </div>

      {/* Optimized keyframe animation */}
      <style>{`
        @keyframes gentle-float {
          0%, 100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.1;
          }
          25% {
            transform: translate3d(20px, -20px, 0);
            opacity: 0.15;
          }
          50% {
            transform: translate3d(40px, 0, 0);
            opacity: 0.1;
          }
          75% {
            transform: translate3d(20px, 20px, 0);
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
};

// Memoize the entire component
export default React.memo(GradientBackground);

// Named export for compatibility
export { GradientBackground };