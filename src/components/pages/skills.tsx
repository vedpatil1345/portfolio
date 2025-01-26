import { useState } from "react"
import { motion } from "framer-motion"

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
  ]

  const softskills = [
    { name: "Problem Solving", icon: "/icons/problem-solving.svg" },
    { name: "Leadership", icon: "/icons/leadership.svg" },
    { name: "Communication", icon: "/icons/communication.svg" },
    { name: "Teamwork", icon: "/icons/teamwork.svg" },
  ]

  const beyondCode = [
    { name: "Gaming", icon: "/icons/gaming.svg" },
    { name: "Cricket", icon: "/icons/cricket.svg" },
    { name: "Music", icon: "/icons/music.svg" },
    { name: "Reading", icon: "/icons/reading.svg" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {

        staggerChildren: 0.05,
      },
    },
  }

  return (
    <section className="w-full px-4">
      <motion.div
        className="max-w-[95vw] mx-auto space-y-2"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Title Section */}
        <motion.div className="text-center space-y-4 max-w-3xl mx-auto" variants={itemVariants}>
          <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
            Skills & Interests
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
            Discover my technical expertise and personal interests that shape my creative journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Technical Tools Section */}
          <SkillSection
            title="My Toolbox"
            description="Explore the technologies and tools I use to craft exceptional digital experiences."
            skills={techskills}
            variants={itemVariants}
          />

          <div className="space-y-4">
            {/* Beyond Code Section */}
            <SkillSection
              title="Beyond the Code"
              description="Explore my interests and hobbies beyond the digital realm."
              skills={beyondCode}
              variants={itemVariants}
            />

            {/* Soft Skills Section */}
            <SkillSection
              title="Soft Skills"
              description="Essential interpersonal abilities that complement my technical expertise"
              skills={softskills}
              variants={itemVariants}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
function SkillSection({
  title,
  description,
  skills,
  variants,
}: {
  title: string;
  description: string;
  skills: { name: string; icon: string }[];
  variants: {
    hidden: { opacity: number };
    visible: { opacity: number; transition: { staggerChildren: number } };
  };
}) {
  return (
    <motion.div
      variants={variants}
      className="space-y-2 border-2 border-indigo-600/30 dark:border-indigo-400/30 p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-indigo-600 dark:hover:border-indigo-400 group"
    >
      <div className="space-y-2">
        <h3 className="text-1xl sm:text-2xl font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-base">{description}</p>
      </div>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 "
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {skills.map((skill, index) => (
          <SkillIcon key={index} skill={skill} />
        ))}
      </motion.div>
    </motion.div>
  )
}
function SkillIcon({ skill }: { skill: { icon: string; name: string } }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group/skill flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="relative w-4 h-4 sm:w-8 sm:h-8 flex-shrink-0">
        {!isLoaded && !error && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
        )}
        <motion.img
          src={skill.icon || "/placeholder.svg"}
          alt={`${skill.name} icon`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          whileHover={{ rotate: 10 }}
          transition={{ duration: 0.2 }}
        />
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md">
            <span className="text-xs">!</span>
          </div>
        )}
      </div>
      <span className="text-sm text-gray-700 dark:text-gray-200 group-hover/skill:text-indigo-600 dark:group-hover/skill:text-indigo-400 transition-colors duration-300 font-medium">
        {skill.name}
      </span>
    </motion.div>
  )
}

