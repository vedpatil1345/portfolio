export const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Experience",
    path: "/experience",
  }
];

export const calculateSizes = (isMobile, isTablet) => {
  return {
    deskScale: isMobile ? 0.04 : 0.1,
    deskRotation: [0, 0, 0],
    deskPosition: isMobile ? [0, -0.5, 0] : [0, -1.5, -5],
    carPosition: isMobile
      ? [0, -1.3, 3]
      : isTablet
      ? [1, -1, 3]
      : [1.7, -1.45, 3],
    carRotation: isMobile ? [0, -Math.PI / 8, 0] : [0, -Math.PI / 4, 0],
    carScale: isMobile ? 0.2 : isTablet ? 0.2 : 0.35,
    atomScale: isMobile ? 0.12 : isTablet ? 0.15 : 0.2,
    atomPosition: isMobile ? [1, 1.2, 3] : isTablet ? [1.7, 2, 3] : [3.2, 1.4, 3],
    atomRotation: [0, Math.PI, 0],
    earthScale: isMobile ? 0.25 : isTablet ? 0.35 : 0.6,
    earthPosition: isMobile
      ? [-1, 1.1, 3]
      : isTablet
      ? [-1.7, 2, 3]
      : [-4, 1.7, 2],
    droneScale: isMobile ? 0.45 : isTablet ? 0.45 : 0.7,
    dronePosition: isMobile
      ? [-0.5, -1, 3]
      : isTablet
      ? [-1, -0.7, 3]
      : [-2.5, -1.4, 1],
  };
};

export const techskills = [
  { name: "Python", icon: "/assets/python.svg" },
  { name: "Java", icon: "/assets/java.svg" },
  { name: "Flask", icon: "/assets/flask.svg" },
  { name: "Firebase", icon: "/assets/firebase.svg" },
  { name: "MySQL", icon: "/assets/mysql.svg" },
  { name: "TensorFlow", icon: "/assets/tensorflow.svg" },
  { name: "C/C++", icon: "/assets/cpp.svg" },
  { name: "MongoDB", icon: "/assets/mongodb.svg" },
  { name: "React", icon: "/assets/react.svg" },
  { name: "Express", icon: "/assets/express.svg" },
  { name: "Node.js", icon: "/assets/nodejs.svg" },
  { name: "JavaScript", icon: "/assets/javascript.svg" },
  { name: "NextJs" , icon: "/assets/nextjs.svg"}
];

const codetalkDesc = ()=>{
  return(
    <div>
  <h2 className='text-2xl font-bold text-blue-600'>CodeTalk - AI Code Assistant</h2>
  <p className='text-gray-700 dark:text-gray-300'>
    CodeTalk is a smart web app built with React & TypeScript that uses AI (LLaMA 3.3 70B & Gemini) to assist developers with coding, debugging, and translating code.
  </p>
  <ul className='list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1'>
    <li>AI-powered code generation</li>
    <li>Code & error analysis</li>
    <li>Image to UI code (Gemini)</li>
    <li>Multilingual code translation</li>
    <li>Voice command integration</li>
    <li>Real-time suggestions & debugging</li>
    <li>Custom themes & responsive UI</li>
  </ul>
</div>

  )
}
const EplantShoppingDesc = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-green-600'>E-plantShopping - Online Plant Store</h2>
      <p className='text-gray-700 dark:text-gray-300'>
        E-plantShopping is a user-friendly web platform for browsing, selecting, and ordering a wide variety of plants online. Built with modern tech for seamless shopping.
      </p>
      <ul className='list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1'>
        <li>Plant catalog with filters and categories</li>
        <li>Cart and order management</li>
        <li>Secure login and signup system</li>
        <li>Responsive UI for mobile & desktop</li>
        <li>Admin dashboard for product control</li>
        <li>Search functionality for quick access</li>
        <li>Clean and intuitive design</li>
      </ul>
    </div>
  );
};
const MentalHealthChatbotDesc = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-purple-600'>Mental Health Chatbot</h2>
      <p className='text-gray-700 dark:text-gray-300'>
        The Mental Health Chatbot is a conversational AI tool designed to provide emotional support, coping tips, and resources for mental well-being. It simulates empathetic dialogue to help users manage stress and anxiety.
      </p>
      <ul className='list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1'>
        <li>Real-time mental health conversation</li>
        <li>Friendly, non-judgmental AI responses</li>
        <li>Provides coping strategies and advice</li>
        <li>24/7 accessible support system</li>
        <li>Simple and calming UI</li>
        <li>Privacy-focused interaction</li>
        <li>Easy integration into websites or apps</li>
      </ul>
    </div>
  );
};
const WebHarvestDesc = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-indigo-600'>WebHarvest - Web Scraping Tool</h2>
      <p className='text-gray-700 dark:text-gray-300'>
        WebHarvest is a streamlined web scraping tool that efficiently extracts images and hyperlinks from websites. Ideal for content creators, researchers, and marketers.
      </p>
      <ul className='list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1'>
        <li>Extracts images and links from web pages</li>
        <li>Supports single pages and full domains</li>
        <li>Customizable filters for precise scraping</li>
        <li>Multiple export options (CSV, JSON, etc.)</li>
        <li>Clean, user-friendly interface</li>
        <li>No complex setup required</li>
        <li>Built for speed and simplicity</li>
      </ul>
    </div>
  );
};

const PortfolioDesc = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-cyan-600'>Developer Portfolio - Ved Patil</h2>
      <p className='text-gray-700 dark:text-gray-300'>
        This is my first personal portfolio website built with ReactJS, Tailwind CSS, and shadcn/ui. It showcases my skills, projects, and a way to connect professionally.
      </p>
      <ul className='list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1'>
        <li>Responsive and minimal design</li>
        <li>Built using React and Tailwind CSS</li>
        <li>UI components styled with shadcn/ui</li>
        <li>Sections for About, Projects, and Contact</li>
        <li>Interactive contact form</li>
        <li>Easy navigation with smooth transitions</li>
        <li>Clean and professional layout</li>
      </ul>
    </div>
  );
};
const Portfolio2Desc = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-sky-600'>Developer Portfolio v2 - 3D Experience</h2>
      <p className='text-gray-700 dark:text-gray-300'>
        My second personal portfolio is an interactive, visually-rich website built with ReactJS, Tailwind CSS, and Three.js powered by React Three Fiber (R3F). It blends modern UI with 3D elements to create an immersive experience.
      </p>
      <ul className='list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1'>
        <li>3D animations and models using Three.js & R3F</li>
        <li>Responsive layout built with Tailwind CSS</li>
        <li>Smooth scroll and navigation effects</li>
        <li>Sections: About, Projects, Contact</li>
        <li>Emphasizes creativity and frontend skills</li>
        <li>Great for showcasing interactive experiences</li>
        <li>Modern, minimal, and performance-optimized</li>
      </ul>
    </div>
  );
};
const AlphaDesc = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-purple-600'>Project Alpha - AI Interview Simulator</h2>
      <p className='text-gray-700 dark:text-gray-300'>
        Alpha is a full-fledged AI-powered interview preparation and simulation platform. It prepares users for Aptitude, Group Discussion (GD), and Personal Interview (PI) stages, guiding them with personalized learning and real-time simulations. Built to mimic real-world interview processes, Alpha helps users identify weaknesses and improve iteratively through AI analysis.
      </p>
      <ul className='list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1'>
        <li>Two main phases: Learning Phase and Full Interview Simulation</li>
        <li><strong>Learning Phase:</strong> Aptitude, GD, and PI training with conceptual materials and interactive tests</li>
        <li>Aptitude test analysis to redirect users to weak topics with targeted learning</li>
        <li>GD practice with real-time AI agents, speech recognition, and video feedback</li>
        <li>PI prep includes answering HR questions, coding with screen sharing, and response analysis</li>
        <li><strong>Simulation Phase:</strong> AI-led complete interview flow — Aptitude → GD → PI</li>
        <li>Failure at any stage leads to detailed feedback and redirection to specific learning areas</li>
        <li>Smart AI analysis pipeline for precise improvement tracking</li>
        <li>Enhances user confidence, communication skills, and technical preparation for real job interviews</li>
      </ul>
    </div>
  );
};
const CropCareDesc = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-green-700'>CropCare - AI Farmer Assistant and Guide</h2>
      <p className='text-gray-700 dark:text-gray-300'>
        CropCare is an AI-powered platform built to support farmers with real-time guidance, crop health analysis, and personalized agri-solutions. It empowers users with modern tools to enhance productivity and sustainability in farming.
      </p>
      <ul className='list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1'>
        <li>AI chatbot with voice/text support in regional languages</li>
        <li>Upload crop images to detect diseases using computer vision</li>
        <li>Real-time, location-based weather forecasts</li>
        <li>Crop calendar with reminders for all farming stages</li>
        <li>Track current market prices for crops in local markets</li>
        <li>Available in multiple Indian languages for accessibility</li>
      </ul>
      <p className='mt-4 text-gray-700 dark:text-gray-300'>
        <span className='font-semibold'>Tech Stack:</span> 
      </p>
      <p className='mt-2 text-gray-700 dark:text-gray-300'>
        <span className='font-semibold'>Target Users:</span> Small to medium-scale farmers, agriculture students, extension officers, NGOs, and agri-tech startups.
      </p>
    </div>
  );
};

export const projects = [
  {
    name:"CodeTalk",
    description:codetalkDesc(),
    image:"/projects/Codetalk.png",
    gitLink:"https://github.com/vedpatil1345/CodeTalk",
    demoLink:"https://codetalk-2.vercel.app",
    techStack:['React', 'TypeScript', 'Groq(LaMMa 3.3 70B)', 'Firebase', 'Gemini API'],
  },
  {
    name:"E-plantShopping",
    description:EplantShoppingDesc(),
    image:"/projects/EPlantShoping.png",
    gitLink:"https://github.com/vedpatil1345/E-plantShopping",
    demoLink:"",
    techStack:['React', 'Tailwind CSS'],
  },
  {
    name:"Mental Health Chatbot",
    description:MentalHealthChatbotDesc(),
    image:"/projects/MentalBot.png",
    gitLink:"",
    demoLink:"",
    techStack:["python","transformers","lora","streamlit","langchain"],
  },
  {
    name:"WebCapture",
    description:WebHarvestDesc(),
    image:"/projects/WebCapture.png",
    gitLink:"",
    demoLink:"",
    techStack:["python","beautifulsoup","pandas","streamlit"],
  },
  {
    name:"Cropcare",
    description:CropCareDesc(),
    image:"/projects/crop.png",
    gitLink:"https://github.com/vedpatil1345/Crop-care",
    demoLink:"",
    techStack:['Next.js', 'Firebase', 'Supabase', 'Gemini API', 'OpenWeatherMap API'],
  },
  {
    name:"Alpha",
    description:AlphaDesc(),
    image:"/projects/alpha.png",
    gitLink:"https://github.com/vedpatil1345/Ai-interview",
    demoLink:"https://ai-interview-indol.vercel.app/",
    techStack:['Next.js', 'Clerk', 'Supabase', 'Gemini API'],
  },
  {
    name:"portfolio-1",
    description:PortfolioDesc(),
    image:"/projects/Portfolio-1.png",
    gitLink:"https://github.com/vedpatil1345/portfolio",
    demoLink:"https://vedpatil.vercel.app/",
    techStack:['React', 'Tailwind CSS', 'shadcn/ui'],
  },
  {
    name:"portfolio-2",
    description:Portfolio2Desc(),
    image:"/projects/Portfolio-2.png",
    gitLink:"https://github.com/vedpatil1345/portfolio/tree/v2.0",
    demoLink:"https://ved-patil.vercel.app/",
    techStack:['React', 'Tailwind CSS', 'Three.js', 'shadcn/ui', 'React Three Fiber'],
  },
];
const OneM1BExperienceDesc = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-blue-700'>AI & XR Intern - 1M1B Foundation</h2>
      <p className='text-gray-700 dark:text-gray-300'>
        Contributed to AI and Extended Reality (XR) projects focused on social good and innovation. This internship offered exposure to real-world applications of immersive technologies combined with AI capabilities to solve practical challenges.
      </p>
      <ul className='list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1'>
        <li>Developed interactive XR modules using Unity and WebXR frameworks</li>
        <li>Integrated AI-driven conversational agents into XR environments</li>
        <li>Worked on voice-enabled virtual assistants for educational and training scenarios</li>
        <li>Collaborated with multidisciplinary teams on research-backed development</li>
        <li>Created AI prototypes for assistive learning and accessibility</li>
      </ul>
      <p className='mt-4 text-gray-700 dark:text-gray-300'>
        <span className='font-semibold'>Tech Stack:</span> Unity, JavaScript, Python, TensorFlow, WebXR, Firebase
      </p>
      <p className='mt-2 text-gray-700 dark:text-gray-300'>
        <span className='font-semibold'>Impact:</span> Enabled immersive, inclusive learning and support experiences for underserved communities using scalable AI + XR tech.
      </p>
    </div>
  );
};
const MERNInternshipDesc = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-purple-700'>MERN Stack Intern - Next Gen Employability Program (AICTE + EY)</h2>
      <p className='text-gray-700 dark:text-gray-300'>
        This internship offered a deep dive into full-stack web development using the MERN stack, with a focus on building real-world, scalable applications under expert mentorship and an industry-driven curriculum.
      </p>
      <ul className='list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1'>
        <li>Built responsive web applications using React for the frontend</li>
        <li>Developed and secured REST APIs with Node.js and Express</li>
        <li>Implemented CRUD operations and data models with MongoDB</li>
        <li>Followed Agile methodology and Git version control practices</li>
        <li>Completed weekly projects and participated in team reviews</li>
      </ul>
      <p className='mt-4 text-gray-700 dark:text-gray-300'>
        <span className='font-semibold'>Tech Stack:</span> MongoDB, Express.js, React.js, Node.js, Git, Postman, Tailwind CSS
      </p>
      <p className='mt-2 text-gray-700 dark:text-gray-300'>
        <span className='font-semibold'>Outcome:</span> Acquired practical skills to build full-stack applications with clean architecture and real-time performance.
      </p>
    </div>
  );
};

export const workExperiences = [
  {
    name: "1M1B Foundation",
    pos: "AI & XR Intern",
    duration: "Sep 2024 - Nov 2024",
    title: "Contributed to AI and XR solutions to support inclusive, real-world applications for social impact.",
    animation: "clapping",
    icon: "/1m1b.png",
    description: [
      "Worked on projects powered by Large Language Models (LLMs), including a mental health support chatbot and a real-time news summarizer",
      "Gained hands-on experience with LLaMA models and explored LoRA (Low-Rank Adaptation) for parameter-efficient fine-tuning",
      "Successfully fine-tuned a LLaMA model to build a context-aware, domain-specific chatbot",
      "Explored prompt engineering techniques to optimize LLM performance for multi-turn conversation scenarios",
      "Integrated AI components into interactive prototypes for real-world social impact use cases"
    ],
    skills: [ "Python", "Transformers",'LLM','lora','streamlit','langchain'],
  },
  {
    name: "AICTE + EY",
    pos: "MERN Stack Intern",
    duration: "Feb 2025 - Mar 2025",
    title: "Built full-stack web applications using the MERN stack under industry-driven mentorship.",
    animation: "victory",
    icon: "/ey.png",
    description: [
      "Developed responsive UIs with React and secured backend APIs with Node.js/Express",
      "Implemented MongoDB database models with real-time CRUD functionality",
      "Collaborated in Agile teams and deployed weekly builds for feedback"
    ],
    skills: ["MongoDB", "Express.js", "React", "Node.js", "Git", "Tailwind CSS"]
  },
];