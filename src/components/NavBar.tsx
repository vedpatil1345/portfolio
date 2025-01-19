import { memo, useEffect, useReducer, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from 'lucide-react';
import ThemeLogo from '../assets/ThemeLogo';
import { ThemeToggle } from "./theme/ThemeToggle";

const menuReducer = (state: { isMenuOpen: boolean }, action: { type: string }) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case 'CLOSE':
      return { isMenuOpen: false };
    default:
      return state;
  }
};

const SECTIONS: string[] = [
  "home",
  "skills",
  "experience",
  "projects",
  "achievements",
  "contact",
];

export const NavBar = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    setIsScrolling(true);
    const section = document.getElementById(sectionId);
    if (section) {
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar?.offsetHeight || 0;
      const offsetTop = section.offsetTop - navbarHeight;

      window.scrollTo({
        top: offsetTop+24,
        behavior: 'smooth'
      });

      setActiveSection(sectionId);
      const newPath = sectionId === 'home' ? '/' : `/${sectionId}`;
      navigate(newPath, { replace: true });
      
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const updateActiveSection = () => {
      if (isScrolling) return;

      const navbar = document.querySelector('nav');
      const navbarHeight = navbar?.offsetHeight || 0;
      const scrollPosition = window.scrollY + navbarHeight + 100;

      let currentSection = 'home';
      SECTIONS.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section;
          }
        }
      });

      if (activeSection !== currentSection) {
        setActiveSection(currentSection);
        const newPath = currentSection === 'home' ? '/' : `/${currentSection}`;
        navigate(newPath, { replace: true });
      }
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, navigate, isScrolling]);

  useEffect(() => {
    const currentPath = location.pathname.slice(1) || 'home';
    setActiveSection(currentPath);
  }, [location]);

  const [state, dispatch] = useReducer(menuReducer, {
    isMenuOpen: false
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu && !mobileMenu.contains(event.target as Node) && state.isMenuOpen) {
        dispatch({ type: 'CLOSE' });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    const sectionId = section === 'home' ? 'home' : section;
    scrollToSection(sectionId);
    dispatch({ type: 'CLOSE' });
  };

  const isActive = (section: string) => {
    if (section === 'home') {
      return location.pathname === '/' || activeSection === 'home';
    }
    return location.pathname === `/${section}` || activeSection === section;
  };

  return (
    <nav className="fixed w-full top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-300 via-gray-300/70 to-gray-300/10 dark:from-slate-900 from-20% dark:via-slate-900/80 via-50% dark:to-slate-900/5 to-90% shadow-lg dark:shadow-indigo-400/20"
      aria-label="Main Navigation">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center px-[6vw]">
            <NavLink to="/" className="flex " onClick={(e) => handleNavClick(e, 'home')}>
              <ThemeLogo/>
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 px-10">
            {SECTIONS.map((section) => (
              <NavLink
                to={`/${section === 'home' ? '' : section}`}
                key={section}
                onClick={(e) => handleNavClick(e, section)}
                className={`relative lg:text-lg capitalize transition-all duration-300 py-1 ${
                  isActive(section)
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-400 after:rounded-full after:transition-all after:duration-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 after:content-[""] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-400 after:rounded-full after:transition-all after:duration-300 hover:after:w-full hover:after:left-0'
                }`}
              >
                {section}
              </NavLink>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
              className="ml-4 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle navigation menu"
              aria-expanded={state.isMenuOpen}
              aria-controls="mobileMenu"
            >
              {state.isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobileMenu"
          className={`lg:hidden fixed top-16 right-0 h-[calc(100vh-4rem)] w-72 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out shadow-lg border-l border-gray-200 dark:border-gray-800 ${
            state.isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col py-4">
            {SECTIONS.map((section) => (
              <NavLink
                to={`/${section === 'home' ? '' : section}`}
                key={section}
                onClick={(e) => handleNavClick(e, section)}
                className={`relative px-6 py-3 text-lg capitalize transition-all duration-200 ${
                  isActive(section)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                {section}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
});

export const ContactButton = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar?.offsetHeight || 0;
      const offsetTop = section.offsetTop - navbarHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });

      const newPath = sectionId === 'home' ? '/' : `/${sectionId}`;
      navigate(newPath, { replace: true });
    }
  };

  const handleClick = () => {
    scrollToSection('contact');
  };

  return (
    <div className="flex justify-start items-center space-x-4 mt-8">
    <NavLink 
      to="/contact" 
      onClick={handleClick} 
      className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
    >
      Contact Me
      <ArrowRight className="w-4 h-4" />
    </NavLink>
    <NavLink 
    to="/"
    onClick={()=>{window.open("https://drive.google.com/file/d/1-Wt7bM2P6BahVROwy1DqaCpm9-mFptcJ/view?usp=sharing", "_blank")}} 
    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
  >
    My Resume
    <ArrowRight className="w-4 h-4" />
  </NavLink>
  </div>
  );
};