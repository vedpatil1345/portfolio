// Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "./theme-provider";
import NavBar from "./NavBar";
import { usePageTransition } from "./usePageTransition";

export const Layout = () => {
  const [displayLocation, transitionStage, handleAnimationEnd] = usePageTransition();
  
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <NavBar />
      <div
        className={`content ${transitionStage}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <Outlet />
      </div>
    </ThemeProvider>
  );
};

export default Layout;