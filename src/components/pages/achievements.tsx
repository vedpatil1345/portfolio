import React, { useState, useRef, useCallback, memo, useMemo, useEffect } from "react"

interface Achievement {
  name: string
  place: string
  role: string
  description: string
}

interface Certification {
  name: string
  certificateLink: string
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
]

const certifications: Certification[] = [
  {
    name: "Core Java",
    certificateLink: "https://www.coursera.org/account/accomplishments/specialization/MDU7KAQHM4QQ",
  },
  {
    name: "Hands-on Introduction to Linux Commands and Shell Scripting",
    certificateLink: "https://www.coursera.org/account/accomplishments/records/REB6VKGY59Z5",
  },
  {
    name: "SQL",
    certificateLink: "https://www.coursera.org/account/accomplishments/records/4NWS56Y2D9GW",
  },
  {
    name: "Introduction to Generative AI",
    certificateLink:
      "https://www.cloudskillsboost.google/public_profiles/2dd99e08-646f-4180-a7e8-ceb77919606b/badges/8872702",
  },
  {
    name: "Prompt Design in Vertex AI Skill Badge",
    certificateLink: "https://www.credly.com/badges/b3117c0f-59d1-4f89-904c-0c33325da9a6/linked_in_profile",
  },
  {
    name: "Initiating and Planning Projects",
    certificateLink: "https://www.coursera.org/account/accomplishments/records/373FZVU9Z1YJ",
  },
]

const AchievementCard = memo(({ name, place, role, description }: Achievement) => (
  <div className="flex-shrink-0 w-full lg:w-1/2">
    <div className="relative flex flex-col p-6 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-2 border-indigo-600/50 dark:border-indigo-400/50 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:scale-105 group h-full shadow-lg hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      <div className="space-y-3 z-10">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          {name}
        </h3>
        <h4 className="text-lg font-semibold text-indigo-600/90 dark:text-indigo-400/90">{place}</h4>
        <p className="text-sm text-violet-700/90 dark:text-violet-400/90 font-medium">{role}</p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
))

const CertificationCard = memo(({ name, certificateLink }: Certification) => (
  <div className="flex-shrink-0 w-full lg:w-1/2">
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
))

interface ScrollButtonProps {
  direction: "left" | "right"
  onClick: () => void
  color?: "indigo" | "violet"
  isDisabled: boolean
}

const ScrollButton = ({ direction, onClick, color = "indigo", isDisabled }: ScrollButtonProps) => (
  <button
    onClick={onClick}
    disabled={isDisabled}
    className={`absolute ${direction === "left" ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 z-10 
    bg-white/80 dark:bg-slate-800/80 p-3 rounded-full shadow-lg
    transition-all duration-200 hover:scale-110 hover:bg-white dark:hover:bg-slate-800 
    focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900
    ${isDisabled ? 'opacity-0' : ''}`}
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
        d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  </button>
)

interface SectionContainerProps {
  title: string
  color: string
  children: React.ReactNode
}

const SectionContainer = ({ title, color, children }: SectionContainerProps) => (
  <div
    className={`border-2 ${color === "indigo" ? "border-indigo-600/80 dark:border-indigo-400/80" : "border-violet-600/80 dark:border-violet-400/80"} rounded-2xl overflow-hidden p-6 h-full backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 shadow-xl`}
  >
    <div className="text-center mb-8">
      <h2
        className={`text-2xl md:text-3xl font-bold ${color === "indigo" ? "text-indigo-600 dark:text-indigo-400" : "text-violet-600 dark:text-violet-400"}`}
      >
        {title}
      </h2>
    </div>
    {children}
  </div>
)

const Achievements: React.FC = () => {
  const [scrollState, setScrollState] = useState({
    achievements: { showButtons: true, scrollPosition: 0 },
    certifications: { showButtons: true, scrollPosition: 0 }
  });

  const achievementsRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);

  const calculateScrollAmount = useCallback(() => {
    const windowWidth = window.innerWidth;
    return windowWidth >= 1024 ? windowWidth/3 : 
           windowWidth >= 768 ? windowWidth/2 : 
           windowWidth * 0.85;
  }, []);

  const handleScroll = useCallback((
    ref: React.RefObject<HTMLDivElement>, 
    type: 'achievements' | 'certifications'
  ) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      
      setScrollState(prev => ({
        ...prev,
        [type]: {
          showButtons: scrollWidth > clientWidth,
          scrollPosition: scrollLeft
        }
      }));
    }
  }, []);

  useEffect(() => {
    const achievementsContainer = achievementsRef.current;
    const certificationsContainer = certificationsRef.current;

    const handleAchievementsScroll = () => handleScroll(achievementsRef, 'achievements');
    const handleCertificationsScroll = () => handleScroll(certificationsRef, 'certifications');

    if (achievementsContainer) {
      achievementsContainer.addEventListener('scroll', handleAchievementsScroll);
      window.addEventListener('resize', handleAchievementsScroll);
    }

    if (certificationsContainer) {
      certificationsContainer.addEventListener('scroll', handleCertificationsScroll);
      window.addEventListener('resize', handleCertificationsScroll);
    }

    return () => {
      if (achievementsContainer) {
        achievementsContainer.removeEventListener('scroll', handleAchievementsScroll);
        window.removeEventListener('resize', handleAchievementsScroll);
      }

      if (certificationsContainer) {
        certificationsContainer.removeEventListener('scroll', handleCertificationsScroll);
        window.removeEventListener('resize', handleCertificationsScroll);
      }
    };
  }, [handleScroll]);

  const scroll = useCallback((
    direction: "left" | "right", 
    ref: React.RefObject<HTMLDivElement>,
    type: 'achievements' | 'certifications'
  ) => {
    if (ref.current) {
      const scrollAmount = calculateScrollAmount() + 32;
      const newScrollPosition = ref.current.scrollLeft + 
        (direction === "left" ? -scrollAmount : scrollAmount);

      ref.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });

      setScrollState(prev => ({
        ...prev,
        [type]: { 
          ...prev[type], 
          scrollPosition: newScrollPosition 
        }
      }));
    }
  }, [calculateScrollAmount]);

  const scrollTrackers = useMemo(() => ({
    achievements: {
      ref: achievementsRef,
      type: 'achievements' as const,
      data: achievements
    },
    certifications: {
      ref: certificationsRef,
      type: 'certifications' as const,
      data: certifications
    }
  }), []);

  return (
    <div className="w-full overflow-hidden px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Achievements & Certifications
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Notable accomplishments, recognition, and professional credentials
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(scrollTrackers).map(([key, tracker]) => {
          const isLeftButtonVisible = scrollState[tracker.type].scrollPosition > 0;
          const isRightButtonVisible = 
            !tracker.ref.current || 
            scrollState[tracker.type].scrollPosition < 
            (tracker.ref.current.scrollWidth - tracker.ref.current.clientWidth);
          
          return (
            <SectionContainer 
              key={key} 
              title={key.charAt(0).toUpperCase() + key.slice(1)} 
              color={key === 'achievements' ? 'indigo' : 'violet'}
            >
              <div className="relative max-w-[800px] mx-auto">
                <div className="relative">
                  {scrollState[tracker.type].showButtons && tracker.data.length > 1 && (
                    <>
                      <ScrollButton 
                        direction="left" 
                        onClick={() => scroll('left', tracker.ref, tracker.type)}
                        color={tracker.type === 'achievements' ? 'indigo' : 'violet'}
                        isDisabled={!isLeftButtonVisible}
                      />
                      <ScrollButton 
                        direction="right" 
                        onClick={() => scroll('right', tracker.ref, tracker.type)}
                        color={tracker.type === 'achievements' ? 'indigo' : 'violet'}
                        isDisabled={!isRightButtonVisible}
                      />
                    </>
                  )}

                  <div 
                    ref={tracker.ref} 
                    className="overflow-x-auto scroll-smooth scrollbar-hide"
                  >
                    <div className="flex space-x-8 pb-8 px-4">
                      {tracker.data.map((item, index) => 
                        tracker.type === 'achievements' ? (
                          <AchievementCard key={index} {...item as Achievement} />
                        ) : (
                          <CertificationCard key={index} {...item as Certification} />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SectionContainer>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;