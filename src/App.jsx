import { ThemeProvider } from "./components/theme-provider";
import NavBar from "./components/NavBar";
import Hero from "./components/pages/Hero";
import About from "./components/pages/About";
import Projects from "./components/pages/Projects";
import Contact from "./components/pages/Contact";

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="font-sans dark:bg-black bg-slate-50">
      <NavBar />
      <section id="home" className="min-h-screen"><Hero/></section>
      <section id="about" className="min-h-screen pt-12"><About/></section>
      <section id="projects" className="min-h-screen pt-12"><Projects/></section>
      <section id="contact" className="min-h-screen pt-12"><Contact/></section>
      </div>
    </ThemeProvider>
  )
}

export default App
