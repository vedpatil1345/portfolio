import { lazy, Suspense } from "react"
import { NavBar } from "./components/NavBar"
import { ThemeProvider } from "./components/theme/ThemeProvider"
import { GradientBackground } from "./components/GradientBackground"
import { LoadingSpinner } from "./components/LoadingSpinner"
import { AnimatedSection } from "./components/AnimatedSection"

const Home = lazy(() => import("@/components/pages/home"))
const Contact = lazy(() => import("@/components/pages/contact"))
const Skills = lazy(() => import("@/components/pages/skills"))
const Experience = lazy(() => import("@/components/pages/experience"))
const Projects = lazy(() => import("@/components/pages/projects"))
const Achievements = lazy(() => import("@/components/pages/achievements"))

const sections = [
  { id: "home", Component: Home },
  { id: "skills", Component: Skills },
  { id: "experience", Component: Experience },
  { id: "projects", Component: Projects },
  { id: "achievements", Component: Achievements },
  { id: "contact", Component: Contact },
]

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <NavBar />
      <GradientBackground className="min-h-screen overflow-auto flex flex-col font-mono">
        <div className="bg-gray-400/30 dark:bg-blue-950/30">
          {sections.map(({ id, Component }) => (
            <section key={id} id={id} className={`flex flex-col lg:min-h-screen ${id=='home'?'mt-5 pt-5':'mt-10 py-12'} lg:pt-12`}>
              <Suspense fallback={<LoadingSpinner />}>
                <AnimatedSection>
                  <Component />
                </AnimatedSection>
              </Suspense>
            </section>
          ))}
        </div>
      </GradientBackground>
    </ThemeProvider>
  )
}

export default App