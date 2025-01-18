import { useState, useCallback, useRef, useEffect } from 'react';

interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
  logoUrl?: string;
}

const ExperienceCard = ({ 
  role, 
  company, 
  duration, 
  description, 
  logoUrl 
}: Experience) => (
  <div className="flex-shrink-0 w-[85vw] md:w-[48%] lg:w-[31%]">
    <div className="relative flex flex-row gap-4 p-6 rounded-lg bg-white dark:bg-slate-800/50 backdrop-blur-sm border-2 border-indigo-600 dark:border-indigo-400 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:scale-105 group h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      
      <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center z-10">
        <img
          src={logoUrl || "/api/placeholder/96/96"}
          alt={`${company} logo`}
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="flex-grow space-y-2 z-10">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          {role}
        </h3>
        <h4 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
          {company}
        </h4>
        <p className="text-sm text-violet-700 dark:text-violet-400 font-medium">
          {duration}
        </p>
        <ul className="space-y-1 text-slate-700 dark:text-slate-300">
          {description.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const Experience = () => {
  const [showButtons, setShowButtons] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const experiences: Experience[] = [
    {
      role: "AI & XR Intern",
      company: "1M1B Foundation",
      duration: "September 2024 - November 2024",
      logoUrl: "/1m1b-logo.png",
      description: [
        "Contributed to innovative projects in Artificial Intelligence and Extended Reality",
        "Developed and implemented cutting-edge AI solutions",
        "Collaborated on XR applications for real-world use cases",
      ],
    },
    {
      role: "Training and Placement Coordinator",
      company: "Madhuben and Bhanubhai Patel Institute of Technology",
      duration: "Academic Year 2025-26",
      logoUrl: "/mbit-logo.png",
      description: [
        "Serving as the Training and Placement Coordinator",
        "Facilitating career development opportunities for students",
        "Organizing placement drives and training sessions",
      ],
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth =window.innerWidth >= 1024 ? window.innerWidth/3 : 
                       window.innerWidth >= 768 ?  window.innerWidth/2 : window.innerWidth*0.85;
      
      const scrollAmount = cardWidth + 32;
      const newScrollPosition = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {


      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowButtons(scrollWidth > clientWidth);
    }
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll();
      window.addEventListener('resize', handleScroll);
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <div className="w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Professional Experience
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          My journey through various roles and responsibilities
        </p>
      </div>
      
      <div className="relative max-w-[1600px] mx-auto">
        <div className="relative group">
          {showButtons && experiences.length > 1 && (
            <>
              <button
                onClick={() => scroll('left')}
                className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/20 dark:bg-slate-800/20 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none`}
                aria-label="Scroll left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
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
                onClick={() => scroll('right')}
                className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/20 dark:bg-slate-800/20 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none`}
                aria-label="Scroll right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
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
            </>
          )}

          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scroll-smooth scrollbar-hide"
          >
            <div className="flex space-x-8 pb-8 px-4 py-4">
              {experiences.map((experience, index) => (
                <ExperienceCard key={index} {...experience} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;