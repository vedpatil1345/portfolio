import { lazy, Suspense } from 'react'
import { NavBar } from "./components/NavBar"
import { ThemeProvider } from "./components/theme/ThemeProvider"
import { GradientBackground } from "./components/GradientBackground"

// Lazy load components
const Home = lazy(() => import("@/components/pages/home"))
const ContactPage = lazy(() => import("./components/pages/contact"))
const Skills = lazy(() => import("./components/pages/skills"))
const Experience = lazy(() => import("./components/pages/experience"))
const Projects = lazy(() => import("./components/pages/projects"))

// Loading fallback component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
)

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <NavBar />
      <GradientBackground className="min-h-screen overflow-auto flex flex-col font-mono pt-12">
        <div className="bg-gray-400/30 dark:bg-blue-950/30">
          <Suspense fallback={<LoadingSpinner />}>
            <section id="home" className="flex flex-col min-h-fit">
              <Home />
            </section>
            <section id="skills" className="flex flex-col min-h-fit">
              <Skills />
            </section>
            <section id="experience" className="flex flex-col min-h-fit">
              <Experience/>
            </section>
            <section id="projects" className="flex flex-col min-h-fit">
              <Projects/>
            </section>
            <section id="contact" className="flex flex-col min-h-fit">
              <ContactPage />
            </section>
          </Suspense>
        </div>
      </GradientBackground>
    </ThemeProvider>
  )
}
export default App