import { Check, Copy, Github, Linkedin, Twitter } from "lucide-react";
import React, { useState, lazy, Suspense } from "react";

// Lazy load heavy components
const Clock = lazy(() => import("../elements/Clock"));
const Skills = lazy(() => import("../elements/Skills"));
import emailjs from "@emailjs/browser";

const About = () => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("vedpatil13042005@gmail.com");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setStatus("Sending...");
    setIsSubmitting(true);

    emailjs
      .send(
        "service_cgm8gjb",
        "template_pupr2dy",
        formData,
        "k4AgOiH_khBqSvIJL"
      )
      .then(
        () => {
          setStatus("Message Sent Successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          setStatus("Failed to send message. Try again.");
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="w-[95vw] mx-auto px-4 py-8">
      <h1 className="text-5xl font-extrabold text-black dark:text-white mb-8 text-center md:text-left">About</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div className="grid grid-rows-[50%_50%] gap-6 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white dark:bg-gray-900">
          <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 pt-12 pb-16 px-6">
            <div className="absolute top-3 left-3 flex space-x-2">
              <div className="bg-red-500 h-3 w-3 rounded-full"></div>
              <div className="bg-yellow-500 h-3 w-3 rounded-full"></div>
              <div className="bg-green-500 h-3 w-3 rounded-full"></div>
            </div>
            <div className="flex justify-center ">
              <img
                src="/Ved.svg"
                className="w-40 h-40 object-cover rounded-xl shadow-lg border-4 bg-black border-white dark:border-gray-800 transform hover:scale-105 transition-transform duration-300"
                alt="Ved Patil"
                loading="lazy"
              />
            </div>
          </div>
          <div className="p-6 bg-white dark:bg-gray-900">
            <h4 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-3">
              Hi, I am Ved Patil
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Ved Patil, a computer engineering student at Madhuben and
              Bhanubhai Patel Institute of Technology, developing expertise in
              Web development, AI and innovative tech solutions.
            </p>
          </div>
        </div>

        {/* Skills Card */}
        <div className="grid grid-rows-[50%_50%] border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white dark:bg-gray-900">
          <div className="flex overflow-hidden">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading skills...</div>}>
              <Skills />
            </Suspense>
          </div>
          <div className="p-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <h4 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100 mb-3">
              My Tool Box
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              My tech stack includes React, Next.js, Java, JavaScript,
              TypeScript, Python, Node.js, Express, Django, Flask, SQL, MongoDB,
              and TensorFlow. I specialize in building and optimizing
              applications, leveraging Git, GitHub, and VS Code for development.
            </p>
          </div>
        </div>

        {/* Contact Card */}
        <div className="grid grid-rows-[50%_50%] gap-6 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white dark:bg-gray-900">
          <div className="h-1/2 p-6">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading clock...</div>}>
              <Clock />
            </Suspense>
          </div>
          <div className="p-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center h-1/2">
            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Contact Me
            </h4>
            <div className="flex items-center mb-6 group cursor-pointer" onClick={handleCopy}>
              <button className="mr-2 transform group-hover:scale-110 transition-transform duration-300">
                {isCopied ? (
                  <Check className="text-green-500" size={20} />
                ) : (
                  <Copy className="text-gray-600 dark:text-gray-300" size={20} />
                )}
              </button>
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                vedpatil13042005@gmail.com
              </span>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/vedpatil1345"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <Github size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/ved-patil-a71968250/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="https://x.com/vedpatil1729"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black text-white hover:bg-gray-900 transition-colors duration-300"
              >
                <Twitter size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex flex-col border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white dark:bg-gray-900 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Let's talk</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Looking to build a website or improve your platform? Let's chat!
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="johndoe@gmail.com"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Share your thoughts..."
                rows="4"
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              {!isSubmitting && (
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              )}
            </button>

            {status && (
              <div className={`mt-4 px-4 py-3 rounded-lg text-center ${status === "Message Sent Successfully!"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : status === "Sending..."
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}>
                {status}
              </div>
            )}
          </form>
        </div>

        {/* Resume Card - Use iframe instead of embed for better performance */}
        <div className="col-span-1 md:col-span-2 flex flex-col border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white dark:bg-gray-900">
          <div className="rounded-t-lg overflow-hidden h-[450px]">
            <Suspense fallback={'LoadingManager....'}>
              <iframe src="/Ved.pdf" width="100%" height="100%" className="border-b border-gray-300 dark:border-gray-700" title="Resume"></iframe>
            </Suspense>
          </div>
          <div className="p-6 text-center">
            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              My Resume
            </h4>
            <a
              href="/Ved.pdf"
              download
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 mt-2"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(About);