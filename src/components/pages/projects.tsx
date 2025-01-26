import { useState, useCallback, memo, useRef, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectData {
  title: string;
  description: string;
  imageUrl: string;
  previewUrl: string;
  githubUrl: string;
  technologies: string[];
}

// Static project data instead of fetching from GitHub
const PROJECTS_DATA: ProjectData[] = [
  {
    title: "CodeTalk",
    description: "CodeTalk: A web app leveraging LLaMA 3.3, Gemini AI 🤖, React ⚛️, and Firebase 🔐 for real-time code analysis, debugging, and optimization. Key features include image-to-code 🖼️➡️💻, voice-to-code 🎙️➡️💻, advanced editor with auto-completion ✍️, secure authentication 🔒, and responsive Tailwind CSS 🌐. Boost productivity and simplify coding!",
    imageUrl: "/codetalk.png",
    previewUrl: "https://codetalk-2.vercel.app",
    githubUrl: "https://github.com/vedpatil1345/CodeTalk",
    technologies: ['React','TailwindCSS','Firebase','Meta Llama','Gemini']
  },
  {
    title: "Portfolio",
    description: "A personal portfolio website built using React to showcase my skills, projects, certifications, and professional journey.",
    imageUrl: "/portfolio.png",
    previewUrl: "https://vedpatil.vercel.app",
    githubUrl: "https://github.com/vedpatil1345/portfolio",
    technologies: ["React","TailwindCSS", "Framer Motion"]
  },
  {
    title: "Web Scrapper",
    description: "Web Scraping Tool 🕸️ An intuitive web app built with Streamlit for effortless web scraping. Extract links, text, images, and custom elements from websites. Features include: Image previews with alt text and URL extraction Support for HTML tags and CSS classes CSV export for all scraped data",
    imageUrl: "/web-scrapper.png",
    previewUrl: "https://web-scrapper-v.streamlit.app",
    githubUrl: "https://github.com/vedpatil1345/Web-Scrapper",
    technologies: ["Python", "BeautifulSoup", "Streamlit", "Pandas"]
  }
];

const ProjectCard = memo(({ 
  title, 
  description, 
  imageUrl, 
  previewUrl, 
  githubUrl, 
  technologies
}: ProjectData) => (
  <div className="flex-shrink-0 w-[85vw] md:w-[48%] lg:w-[31%]">
    <div className="bg-white/10 dark:bg-slate-800/40 backdrop-blur-sm rounded-xl overflow-hidden group">
      <div className="relative">
        <img
          src={imageUrl}
          alt={`${title} preview`}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-indigo-600/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-4">
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/20 rounded-full hover:bg-white/40 transition-colors duration-300 transform hover:scale-110"
              aria-label="View Live Demo"
            >
              <ExternalLink className="w-6 h-6 text-white" />
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/20 rounded-full hover:bg-white/40 transition-colors duration-300 transform hover:scale-110"
              aria-label="View Source Code"
            >
              <Github className="w-6 h-6 text-white" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span 
              key={`${tech}-${index}`}
              className="px-3 py-1 bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
));

ProjectCard.displayName = 'ProjectCard';

export const Projects = () => {
  const [scrollState, setScrollState] = useState({
    showButtons: true,
    scrollPosition: 0,
    maxScroll: 0
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Updated scroll handler to more accurately track scroll position
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      setScrollState(() => ({
        showButtons: scrollWidth > clientWidth,
        scrollPosition: scrollLeft,
        maxScroll: scrollWidth - clientWidth
      }));
    }
  }, []);

  // Use useEffect for adding and removing scroll listeners
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      // Initial check
      handleScroll();

      // Add event listeners
      scrollContainer.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      
      // Cleanup
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [handleScroll]);

  // Simplified scroll calculation
  const calculateScrollAmount = useCallback(() => {
    const windowWidth = window.innerWidth;
    return windowWidth >= 1024 ? windowWidth/3 : 
           windowWidth >= 768 ? windowWidth/2 : 
           windowWidth * 0.85;
  }, []);

  // Optimized scroll function
  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = calculateScrollAmount() + 32; // Adding gap
      const newScrollPosition = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  }, [calculateScrollAmount]);

  // More robust scroll button visibility logic
  const isLeftButtonVisible = scrollState.scrollPosition > 0;
  const isRightButtonVisible = scrollState.scrollPosition < scrollState.maxScroll;

  return (
    <div className="w-full overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          A selection of my best work
        </p>
      </div>
      
      <div className="relative max-w-[1600px] mx-auto">
        <div className="relative">
          {scrollState.showButtons && PROJECTS_DATA.length > 1 && (
            <>
              <button
                onClick={() => scroll('left')}
                className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/40 dark:bg-slate-800/40 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none ${
                  !isLeftButtonVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                aria-label="Previous project"
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
                className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/40 dark:bg-slate-800/40 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none ${
                  !isRightButtonVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                aria-label="Next project"
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
            <div className="flex space-x-8 pb-8 px-4">
              {PROJECTS_DATA.map((project, index) => (
                <ProjectCard key={`${project.githubUrl}-${index}`} {...project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;