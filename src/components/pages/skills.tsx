import { useState } from 'react';

export default function Skills() {
  const techskills = [
    { name: "Python", icon: "/icons/python.svg" },
    { name: "JavaScript", icon: "/icons/javascript.svg" },
    { name: "Java", icon: "/icons/java.svg" },
    { name: "C/C++", icon: "/icons/cpp.svg" },
    { name: "SQL", icon: "/icons/sql.svg" },
    { name: "React", icon: "/icons/react.svg" },
    { name: "Node.js", icon: "/icons/nodejs.svg" },
    { name: "Express", icon: "/icons/express.svg" },
    { name: "Firebase", icon: "/icons/firebase.svg" },
    { name: "MongoDB", icon: "/icons/mongodb.svg" },
    { name: "MySQL", icon: "/icons/mysql.svg" },
    { name: "Django", icon: "/icons/django.svg" },
    { name: "Flask", icon: "/icons/flask.svg" },
    { name: "pytorch", icon: "/icons/pytorch.svg" },
    { name: "TensorFlow", icon: "/icons/tensorflow.svg" },
  ];

  const softskills = [
    { name: "Problem Solving", icon: "/icons/problem-solving.svg" },
    { name: "Leadership", icon: "/icons/leadership.svg" },
    { name: "Communication", icon: "/icons/communication.svg" },
    { name: "Teamwork", icon: "/icons/teamwork.svg" },
  ];

  const beyondCode = [
    { name: "Gaming", icon: "/icons/gaming.svg" },
    { name: "Cricket", icon: "/icons/cricket.svg" },
    { name: "Music", icon: "/icons/music.svg" },
    { name: "Reading", icon: "/icons/reading.svg" },
  ];

  return (
    <section className="w-full py-10 px-6">
      <div className="max-w-[80vw] mx-auto space-y-16">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Skills & Interests
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Discover my technical expertise and personal interests that shape my creative journey
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Technical Tools Section */}
          <div className="flex-1 space-y-6 border-2 border-indigo-600 dark:border-indigo-400 p-6 rounded-2xl dark:bg-gray-800/50 bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">My Toolbox</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Explore the technologies and tools I use to craft exceptional digital experiences.
            </p>
            <div className="flex flex-wrap gap-6">
              {techskills.map((skill, index) => (
                <SkillIcon key={index} skill={skill} />
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-8">
            {/* Beyond Code Section */}
            <div className="flex-1 space-y-6 border-2 border-indigo-600 dark:border-indigo-400 p-6 rounded-2xl dark:bg-gray-800/50 bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">Beyond the Code</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Explore my interests and hobbies beyond the digital realm.
              </p>
              <div className="flex flex-wrap gap-6">
                {beyondCode.map((skill, index) => (
                  <SkillIcon key={index} skill={skill} />
                ))}
              </div>
            </div>

            {/* Soft Skills Section */}
            <div className="flex-1 space-y-6 border-2 border-indigo-600 dark:border-indigo-400 p-6 rounded-2xl dark:bg-gray-800/50 bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">Soft Skills</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Soft skills which make me a better developer
              </p>
              <div className="flex flex-wrap gap-6">
                {softskills.map((skill, index) => (
                  <SkillIcon key={index} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillIcon({ skill }: { skill: { icon: string; name: string }}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
      <div className="relative w-5 h-5">
        {!isLoaded && !error && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-sm" />
        )}
        <img
          src={skill.icon || "/placeholder.svg"}
          alt={`${skill.name} icon`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-contain ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-sm">
            <span className="text-xs">!</span>
          </div>
        )}
      </div>
      <span className="text-sm">{skill.name}</span>
    </div>
  );
}

