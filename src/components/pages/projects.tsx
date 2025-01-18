import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface FeaturedProject {
  repo: string;
  previewUrl: string;
}

interface ProjectData {
  title: string;
  description: string;
  imageUrl: string | null;
  previewUrl: string;
  githubUrl: string;
  language: string | null;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    repo: "vedpatil1345/CodeTalk",
    previewUrl: "https://codetalk-2.vercel.app"
  },
  {
    repo: "vedpatil1345/portfolio",
    previewUrl: "https://vedpatil.vercel.app"
  },
  {
    repo: "vedpatil1345/Web-Scrapper",
    previewUrl: "https://web-scrapper-v.streamlit.app"
  }
];

const ProjectCard = memo(({ 
  title, 
  description, 
  imageUrl, 
  previewUrl, 
  githubUrl, 
  language
}: ProjectData) => (
  <div className="flex-shrink-0 w-[85vw] md:w-[48%] lg:w-[31%]">
    <Card className="group relative h-full overflow-hidden bg-white dark:bg-gray-800/50 backdrop-blur-sm border-2 border-indigo-600 dark:border-indigo-400 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
      <div className="relative w-full h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors duration-300 z-10" />
        <img
          src={imageUrl || "/api/placeholder/400/200"}
          alt={`${title} preview`}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/api/placeholder/400/200";
          }}
        />
      </div>
    
      <CardContent className="relative p-6 flex flex-col gap-4 bg-transparent">
        <div className="flex justify-center items-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            {title}
          </h3>
          
        </div>
      
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {description}
        </p>
      
        {language && (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-indigo-600 dark:text-indigo-400 font-medium">
              {language}
            </span>
          </div>
        )}
      
        <div className="flex gap-3 mt-auto pt-4">
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg transition-all duration-300 font-medium"
          >
            <ExternalLink size={16} className="transform group-hover:rotate-12 transition-transform duration-300" />
            <span>Live Demo</span>
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-all duration-300 font-medium"
          >
            <Github size={16} className="transform group-hover:rotate-12 transition-transform duration-300" />
            <span>Source</span>
          </a>
        </div>
      </CardContent>
    </Card>
  </div>
));

ProjectCard.displayName = 'ProjectCard';

const ProjectSkeleton = () => (
  <div className="flex-shrink-0 w-[85vw] md:w-[48%] lg:w-[31%]">
    <Card className="h-full">
      <Skeleton className="w-full h-48 rounded-t-lg" />
      <CardContent className="p-6 flex flex-col gap-6">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-8 w-24 mt-2" />
        <div className="flex gap-4 mt-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </CardContent>
    </Card>
  </div>
);

const Projects = () => {
  const [projectsData, setProjectsData] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

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


  const fetchProjects = useCallback(async () => {
    try {
      const headers: HeadersInit = {};
      const projectPromises = FEATURED_PROJECTS.map(async ({ repo, previewUrl }) => {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);

          const response = await fetch(`https://api.github.com/repos/${repo}`, { 
            headers,
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch ${repo}`);
          }
          
          const repoData = await response.json();
          
          return {
            title: repoData.name,
            description: repoData.description || "No description available",
            imageUrl: `https://raw.githubusercontent.com/${repo}/Main/image.png`,
            previewUrl,
            githubUrl: repoData.html_url,
            language: repoData.language
          } as ProjectData;
        } catch (error) {
          console.error(`Error fetching ${repo}:`, error);
          return {
            title: repo.split('/')[1],
            description: "Project details temporarily unavailable",
            imageUrl: null,
            previewUrl,
            githubUrl: `https://github.com/${repo}`,
            language: null,
          } as ProjectData;
        }
      });

      const data = await Promise.all(projectPromises);
      setProjectsData(data.filter((project): project is ProjectData => project !== undefined));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-7">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          A selection of my best work
        </p>
      </div>
      
      <div className="relative max-w-[1600px] mx-auto ">
        {loading ? (
          <div className="flex space-x-8 pb-8 px-4 overflow-x-auto">
            {Array(3).fill(0).map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-red-600 dark:text-red-400">
              Error loading projects: {error}
            </p>
          </div>
        ) : (
          <div className="relative group">
            {/* Navigation Buttons */}
            {showButtons && projectsData.length > 1 && (
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

            {/* Scrollable Container */}
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto scroll-smooth scrollbar-hide"
            >
              <div className="flex space-x-8 pb-8 px-4 py-4">
                {projectsData.map((project) => (
                  <ProjectCard key={project.githubUrl} {...project} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

};
export default Projects;