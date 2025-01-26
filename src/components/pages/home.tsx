import { useCallback } from "react"
import { ContactButton } from "../NavBar"
import { TypewriterEffect } from "./TypewriterEffect"

export const Home = () => {
  const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.classList.remove("opacity-0")
  }, [])

  return (
    <main className="lg:min-h-screen">
      <section className="relative w-full pt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row-reverse justify-between items-center gap-8 lg:gap-28">
          <div className="relative flex items-center justify-center w-[280px] h-[280px] lg:w-[455px] lg:h-[455px] rounded-full shadow-2xl shadow-indigo-400/20 dark:shadow-indigo-500/20">
            <div className="absolute inset-0 border-x-8 border-y-2 border-indigo-500 dark:border-indigo-400 rounded-full animate-rotate-border"></div>
            <div className="overflow-hidden rounded-full bg-gradient-to-br from-indigo-100 via-blue-100 to-violet-100 dark:from-indigo-900 dark:via-blue-900 dark:to-violet-900 w-[275px] h-[275px] lg:w-[450px] lg:h-[450px] shadow-2xl shadow-indigo-400/20 dark:shadow-indigo-500/20">
              <img
                src="/image.png"
                alt="Ved Patil"
                width={450}
                height={450}
                className="object-cover w-full h-full transition duration-300 ease-in-out transform hover:scale-110 opacity-0"
                onLoad={handleImageLoad}
                loading="lazy"
              />
            </div>
          </div>
          <div className="space-y-4 w-full lg:w-1/2 text-center lg:text-left">
            <header className="space-y-2">
              <h2 className="text-indigo-600 dark:text-indigo-400 text-3xl md:text-5xl font-extrabold tracking-tight animate-fade-in">
                Hello,
              </h2>
              <h1 className="text-3xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tighter animate-fade-in-up">
                I am Ved Patil.
              </h1>
            </header>
            <h3
              className="text-violet-700 dark:text-violet-400 text-2xl md:text-4xl font-bold animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <TypewriterEffect />
            </h3>
            <p
              className="text-slate-700 dark:text-slate-300 text-md md:text-xl max-w-2xl leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              I'm a computer engineering student at Madhuben and Bhanubhai Patel Institute of Technology, pursuing a
              BTech (September 2022 – July 2026). I'm currently proficient in Python, JavaScript, Java, and C/C++, with
              experience in cloud platforms, databases, Git, and Docker. I have a strong interest in Generative AI,
              backend development, and web technologies, and I'm passionate about building scalable, AI-driven systems.
            </p>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <ContactButton />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home

