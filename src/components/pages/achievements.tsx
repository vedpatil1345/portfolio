// achievements.tsx
import { useState, useCallback, useRef, useEffect } from 'react';

interface Achievement {
  name: string;
  place: string;
  role: string;
  description: string;
}

interface Certification {
  name: string;
  certificateLink: string;
}

// Sample data
const achievements: Achievement[] = [
  {
    name: "Participant in Hackout 2024",
    place: "DAIICT,Gandhinagar",
    role: "Team Lead",
    description: "Led a team of 4 to develop an AI-powered solution for sustainable urban farming.",
  },
  // Add more achievements as needed
];

const certifications: Certification[] = [
  {
    name: "Core Java",
    certificateLink: "https://www.coursera.org/account/accomplishments/specialization/MDU7KAQHM4QQ"
  },
  {
    name: "Hands-on Introduction to Linux Commands and Shell Scripting",
    certificateLink: "https://www.coursera.org/account/accomplishments/records/REB6VKGY59Z5"
  },
  {
    name: "SQL",
    certificateLink: "https://www.coursera.org/account/accomplishments/records/4NWS56Y2D9GW"
  },
  {
    name: "Introduction to Generative AI",
    certificateLink: "https://www.cloudskillsboost.google/public_profiles/2dd99e08-646f-4180-a7e8-ceb77919606b/badges/8872702"
  },
  {
    name: "Prompt Design in Vertex AI Skill Badge",
    certificateLink: "https://www.credly.com/badges/b3117c0f-59d1-4f89-904c-0c33325da9a6/linked_in_profile"
  },
  {
    name: "Initiating and Planning Projects",
    certificateLink: "https://www.coursera.org/account/accomplishments/records/373FZVU9Z1YJ"
  }
];

// Global styles for hiding scrollbar
const scrollbarHideStyles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
` as const;

const AchievementCard = ({ name, place, role, description }: Achievement) => (
  <div className="flex-shrink-0 w-[300px] md:w-[350px]">
    <div className="relative flex flex-col p-6 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-2 border-indigo-600/50 dark:border-indigo-400/50 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:scale-105 group h-full shadow-lg hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      <div className="space-y-3 z-10">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          {name}
        </h3>
        <h4 className="text-lg font-semibold text-indigo-600/90 dark:text-indigo-400/90">
          {place}
        </h4>
        <p className="text-sm text-violet-700/90 dark:text-violet-400/90 font-medium">
          {role}
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const CertificationCard = ({ name, certificateLink }: Certification) => (
  <div className="flex-shrink-0 w-[300px] md:w-[350px]">
    <div className="relative flex flex-col p-6 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-2 border-violet-600/50 dark:border-violet-400/50 hover:border-violet-500 dark:hover:border-violet-400 transition-all duration-300 hover:scale-105 group h-full shadow-lg hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-indigo-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      <div className="space-y-4 z-10">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
          {name}
        </h3>
        <a 
          href={certificateLink}
          target="_blank"
          rel="noopener noreferrer"

          className="inline-flex items-center space-x-2 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors duration-300 group-hover:translate-x-1 transform"
        >
          <span>View Certificate</span>
          <span className="text-lg">→</span>
        </a>
      </div>
    </div>
  </div>

);
interface ScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  color?: 'indigo' | 'violet';
}

const ScrollButton = ({ direction, onClick, color = "indigo" }: ScrollButtonProps) => (
  <button
    onClick={onClick}
    className={`absolute ${direction === 'left' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 z-10 
    bg-white/20 dark:bg-slate-800/20 p-3 rounded-full shadow-lg
    transition-all duration-200 hover:scale-110 hover:bg-white dark:hover:bg-slate-800 
    focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900`}
    aria-label={`Scroll ${direction}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d={direction === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} 
      />
    </svg>
  </button>
);

interface SectionContainerProps {
  title: string;
  color: string;
  children: React.ReactNode;
}

const SectionContainer = ({ title, color, children }: SectionContainerProps) => (
  <div className={`border-2 ${color ==='indigo'? 'border-indigo-600/80 dark:border-indigo-400/80' : 'border-violet-600/80 dark:border-violet-400/80'} rounded-2xl overflow-hidden p-4 h-full backdrop-blur-sm bg-white/5 dark:bg-slate-900/5`}>
    <div className="text-center mb-8">
      <h2 className={`text-2xl md:text-3xl font-bold`}>
        {title}
      </h2>
    </div>
    {children}
  </div>
);

const Achievements = () => {
  const [showAchievementButtons, setShowAchievementButtons] = useState(true);
  const [showCertificationButtons, setShowCertificationButtons] = useState(true);
  
  const achievementsRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const cardWidth = window.innerWidth >= 1024 ? 350 : 300;
      const scrollAmount = cardWidth + 32; // card width + gap
      const newScrollPosition = ref.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      ref.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = useCallback(() => {
    if (achievementsRef.current) {
      const { scrollWidth, clientWidth } = achievementsRef.current;
      setShowAchievementButtons(scrollWidth > clientWidth);
    }
    if (certificationsRef.current) {
      const { scrollWidth, clientWidth } = certificationsRef.current;
      setShowCertificationButtons(scrollWidth > clientWidth);
    }
  }, []);

  useEffect(() => {
    // Add scrollbar hiding styles
    const styleTag = document.createElement('style');
    styleTag.textContent = scrollbarHideStyles;
    document.head.appendChild(styleTag);

    // Add scroll and resize event listeners
    const achievementsContainer = achievementsRef.current;
    const certificationsContainer = certificationsRef.current;

    if (achievementsContainer && certificationsContainer) {
      achievementsContainer.addEventListener('scroll', handleScroll);
      certificationsContainer.addEventListener('scroll', handleScroll);
      handleScroll();
      window.addEventListener('resize', handleScroll);
      
      return () => {
        styleTag.remove();
        achievementsContainer.removeEventListener('scroll', handleScroll);
        certificationsContainer.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <div className="w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Achievements & Certifications
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Notable accomplishments, recognition, and professional credentials
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <SectionContainer title="Achievements" color="indigo">
          <div className="relative max-w-[800px] mx-auto">
            <div className="relative group">
              {showAchievementButtons && achievements.length > 1 && (
                <>
                  <ScrollButton direction="left" onClick={() => scroll('left', achievementsRef)} color="indigo" />
                  <ScrollButton direction="right" onClick={() => scroll('right', achievementsRef)} color="indigo" />
                </>
              )}

              <div 
                ref={achievementsRef}
                className="overflow-x-auto scroll-smooth hide-scrollbar"
              >
                <div className="flex space-x-8 pb-4 px-4 py-4">
                  {achievements.map((achievement, index) => (
                    <AchievementCard key={index} {...achievement} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer title="Certifications" color="violet">
          <div className="relative max-w-[800px] mx-auto">
            <div className="relative group">
              {showCertificationButtons && certifications.length > 1 && (
                <>
                  <ScrollButton direction="left" onClick={() => scroll('left', certificationsRef)} color="violet" />
                  <ScrollButton direction="right" onClick={() => scroll('right', certificationsRef)} color="violet" />
                </>
              )}

              <div 
                ref={certificationsRef}
                className="overflow-x-auto scroll-smooth hide-scrollbar"
              >
                <div className="flex space-x-8 pb-4 px-4 py-4">
                  {certifications.map((certification, index) => (
                    <CertificationCard key={index} {...certification} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
};

export default Achievements;