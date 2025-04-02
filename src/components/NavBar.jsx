import React, { useState, useEffect } from "react";
import { ModeToggle } from "./mode-toggle";
import ThemeLogo from "./ThemeLogo";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { navItems } from "./data";

const NavItems = () => {
  const navigate = useNavigate();
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToSection = (sectionId) => {
    if (isScrolling) return;

    setIsScrolling(true);
    const section = document.getElementById(sectionId);

    if (section) {
      const navbar =
        document.querySelector("nav") || document.querySelector("header");
      const navbarHeight = navbar?.offsetHeight || 0;
      const offsetTop = section.offsetTop - navbarHeight;

      window.scrollTo({
        top: offsetTop + 24,
        behavior: "smooth",
      });

      const newPath = sectionId === "home" ? "/" : `/${sectionId}`;
      navigate(newPath, { replace: true });

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    } else {
      setIsScrolling(false);
    }
  };

  const handleNavClick = (e, section) => {
    e.preventDefault();
    const sectionId = section === "home" ? "home" : section;
    scrollToSection(sectionId);
  };

  return (
    <ul className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 relative z-100">
      {navItems.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `text-blue-900 dark:text-white ${
                isActive ? "font-extrabold" : ""
              } hover:font-bold`
            }
            onClick={(e) => handleNavClick(e, item.name.toLowerCase())}
          >
            {item.name}
          </NavLink>
        </li>
      ))}
      <li>
        <ModeToggle />
      </li>
    </ul>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="fixed top-0 left-0 right-0 max-w-screen h-12 bg-white dark:bg-slate-900 shadow-sm dark:shadow-blue-500 z-100">
      <div className="lg:max-w-7xl max-w-[90vw] mx-auto">
        <div className="flex items-center justify-between mx-auto">
          <NavLink to="/" className="text-blue-900 dark:text-white flex">
            <ThemeLogo />
          </NavLink>

          <button
            className="sm:hidden flex items-center justify-center"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-blue-900 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-blue-900 dark:text-white" />
            )}
          </button>

          <div className="hidden sm:flex">
            <NavItems />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="p-3 w-50 h-screen flex items-center justify-center absolute right-0 mt-3 bg-white dark:bg-slate-900 shadow-md rounded-sm backdrop-blur-sm z-100 transition-all duration-300 ease-in-out">
          <NavItems />
        </div>
      )}
    </header>
  );
};

export default NavBar;
