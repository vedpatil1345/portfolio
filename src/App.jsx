import { ThemeProvider } from "./components/theme-provider";
import NavBar from "./components/NavBar";
import Hero from "./components/pages/Hero";
import About from "./components/pages/About";
import Projects from "./components/pages/Projects";
import Experience from "./components/pages/Experience";

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="font-sans dark:bg-black bg-slate-50">
      <NavBar />
      <section id="home" className="min-h-screen"><Hero/></section>
      <section id="about" className="min-h-screen mt-16"><About/></section>
      <section id="projects" className="min-h-screen mt-16"><Projects/></section>
      <section id="experience" className="h-fit pb-10 mt-16"><Experience/></section>
      </div>
    </ThemeProvider>
  )
}

export default App
