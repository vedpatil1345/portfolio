import { useEffect, useState } from "react";
import { ContactButton } from "../NavBar";

export const Home = () => {
  const words = ["Web Developer", "Python Developer", "Gen-AI Enthusiast"];
  const TYPING_SPEED = 150;
  const DELETING_SPEED = 100;
  const PAUSE_TIME = 2000;

  function TypewriterEffect() {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [delta, setDelta] = useState(TYPING_SPEED);

    useEffect(() => {
      const timeout = setTimeout(() => {
        const currentWord = words[wordIndex];

        if (isDeleting) {
          setText(currentWord.substring(0, text.length - 1));
          setDelta(DELETING_SPEED);
        } else {
          setText(currentWord.substring(0, text.length + 1));
          setDelta(TYPING_SPEED);
        }

        if (!isDeleting && text === currentWord) {
          setTimeout(() => setIsDeleting(true), PAUSE_TIME);
        } else if (isDeleting && text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, delta);

      return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, delta]);

    return (
      <span className="text-indigo-600 dark:text-indigo-400 font-bold">
        {text}
        <span className="animate-pulse">|</span>
      </span>
    );
  }

  return (
    <div className="lg:min-h-screen">
      {/* Hero Section (unchanged) */}
      <div className="relative w-full pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row-reverse justify-between items-center gap-8 lg:gap-28">
          <div className="relative flex items-center justify-center w-[280px] h-[280px] lg:w-[455px] lg:h-[455px] rounded-full shadow-2xl shadow-indigo-400/20 dark:shadow-indigo-500/20">
            <div className="absolute inset-0 border-x-8 border-y-2 border-indigo-500 dark:border-indigo-400 rounded-full animate-rotate-border"></div>
            <div className="overflow-hidden rounded-full bg-gradient-to-br from-indigo-100 via-blue-100 to-violet-100 dark:from-indigo-900 dark:via-blue-900 dark:to-violet-900 w-[275px] h-[275px] lg:w-[450px] lg:h-[450px] shadow-2xl shadow-indigo-400/20 dark:shadow-indigo-500/20">
              <img
                src="/image.png"
                alt="Profile"
                className="object-cover w-full h-full transition duration-300 ease-in-out transform hover:scale-110"
              />
            </div>
          </div>
          <div className="space-y-4 w-full lg:w-1/2 text-center lg:text-left">
            <div className="space-y-2">
              <h2 className="text-indigo-600 dark:text-indigo-400 text-3xl md:text-5xl font-extrabold tracking-tight">
                Hello,
              </h2>
              <h1 className="text-3xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tighter">
                I am Ved Patil.
              </h1>
            </div>
            <h3 className="text-violet-700 dark:text-violet-400 text-2xl md:text-4xl font-bold">
              <TypewriterEffect />
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-md md:text-xl max-w-2xl leading-relaxed">
            I'm a computer engineering student at Madhuben and Bhanubhai Patel Institute of Technology, pursuing a BTech (September 2022 – July 2026). 
  I'm currently proficient in Python, JavaSript, Java, and C/C++, with experience in cloud platforms, databases, Git, and Docker. 
  I have a strong interest in Generative AI, backend development, and web technologies, and I'm passionate about building scalable, AI-driven systems.
            </p>
            <ContactButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
