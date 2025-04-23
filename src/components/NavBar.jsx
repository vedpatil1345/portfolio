import React, { useState, useEffect, useReducer, memo } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import ThemeLogo from "./ThemeLogo";
import { ModeToggle } from "./mode-toggle";
import { navItems } from "./data";

const menuReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case 'CLOSE':
      return { isMenuOpen: false };
    default:
      return state;
  }
};

const NavBar = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);
  const [state, dispatch] = useReducer(menuReducer, {
    isMenuOpen: false
  });
  
  const scrollToSection = (sectionId) => {
    setIsScrolling(true);
    const section = document.getElementById(sectionId);
    if (section) {
      const navbar = document.querySelector('header');
      const navbarHeight = navbar?.offsetHeight || 0;
      const offsetTop = section.offsetTop - navbarHeight;

      window.scrollTo({
        top: offsetTop,
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

      const navbar = document.querySelector('header');
      const navbarHeight = navbar?.offsetHeight || 0;
      const scrollPosition = window.scrollY + navbarHeight + 100;

      let currentSection = 'home';
      navItems.forEach(item => {
        const section = item.name.toLowerCase();
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu && !mobileMenu.contains(event.target) && state.isMenuOpen) {
        dispatch({ type: 'CLOSE' });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.isMenuOpen]);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && state.isMenuOpen) {
        dispatch({ type: 'CLOSE' });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [state.isMenuOpen]);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    const sectionId = section === 'home' ? 'home' : section;
    scrollToSection(sectionId);
    dispatch({ type: 'CLOSE' });
  };

  const isActive = (section) => {
    if (section === 'home') {
      return location.pathname === '/' || activeSection === 'home';
    }
    return location.pathname === `/${section}` || activeSection === section;
  };

  return (
    <header className="py-1 fixed top-2 left-[2.5vw] w-[95vw] rounded-2xl mx-auto z-50 bg-white dark:bg-slate-900 shadow-xl ring-2 dark:ring-blue-500/50 shadow-black/50 dark:shadow-blue-500/50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <NavLink to="/" className="flex items-center " onClick={(e) => handleNavClick(e, 'home')}>
            <ThemeLogo />
          </NavLink>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                onClick={(e) => handleNavClick(e, item.name.toLowerCase())}
                className={`relative transition-all duration-300 ${
                  isActive(item.name.toLowerCase())
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-blue-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:font-bold'
                }`}
              >
                {item.name}
              </NavLink>
            ))}
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <ModeToggle />
            <button
              onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
              className="ml-2 p-2 rounded-lg text-blue-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
              aria-label={state.isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={state.isMenuOpen}
              aria-controls="mobileMenu"
            >
              {state.isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobileMenu"
        className={`sm:hidden fixed top-17 right-[-1px] rounded-l-lg w-64 bg-white dark:bg-slate-900 transform transition-transform duration-300 ease-in-out shadow-lg border-l border-gray-200 dark:border-slate-700 ${
          state.isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col py-6">
          {navItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              onClick={(e) => handleNavClick(e, item.name.toLowerCase())}
              className={`px-6 py-3 text-lg transition-all duration-200 ${
                isActive(item.name.toLowerCase())
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-bold'
                  : 'text-blue-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
});


export default NavBar;