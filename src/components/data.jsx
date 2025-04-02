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
    name: "Contact",
    path: "/contact",
  },
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
  { name: "JavaScript", icon: "/assets/javascript.svg" },
  { name: "Java", icon: "/assets/java.svg" },
  { name: "C/C++", icon: "/assets/cpp.svg" },
  { name: "SQL", icon: "/assets/sql.svg" },
  { name: "React", icon: "/assets/react.svg" },
  { name: "Node.js", icon: "/assets/nodejs.svg" },
  { name: "Express", icon: "/assets/express.svg" },
  { name: "Firebase", icon: "/assets/firebase.svg" },
  { name: "MongoDB", icon: "/assets/mongodb.svg" },
  { name: "MySQL", icon: "/assets/mysql.svg" },
  { name: "Django", icon: "/assets/django.svg" },
  { name: "Flask", icon: "/assets/flask.svg" },
  { name: "PyTorch", icon: "/assets/pytorch.svg" },
  { name: "TensorFlow", icon: "/assets/tensorflow.svg" },
];

export const projects = [
  {
    name:"",
    description:"",
    image:"",
    gitLink:"",
    demoLink:"",
    techStack:[],
  },
  {
    name:"",
    description:"",
    image:"",
    gitLink:"",
    demoLink:"",
    techStack:[],
  },
  {
    name:"",
    description:"",
    image:"",
    gitLink:"",
    demoLink:"",
    techStack:[],
  },
  {
    name:"",
    description:"",
    image:"",
    gitLink:"",
    demoLink:"",
    techStack:[],
  },
];