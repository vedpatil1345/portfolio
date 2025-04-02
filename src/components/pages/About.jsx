import { Check, Copy, Github, Linkedin, Twitter, XIcon } from "lucide-react";
import Clock from "../elements/Clock";
import React, { useState } from "react";
import Skills from "../elements/Skills";
import emailjs from "@emailjs/browser";

const About = () => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("ved.kumar.1999@gmail.com");
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .send(
        "service_cgm8gjb",
        "template_pupr2dy", // Replace with your EmailJS template ID
        formData,
        "k4AgOiH_khBqSvIJL" // Replace with your EmailJS public key
      )
      .then(
        () => {
          setStatus("Message Sent Successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          setStatus("Failed to send message. Try again.");
        }
      );
  };
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="flex flex-col md:grid  md:grid-cols-2 xl:grid-cols-3 gap-4 px-10 w-full ">
        <div className="flex flex-col border-2 border-gray-800 dark:border-gray-500 rounded-md relative h-full">
          <div className="text-center flex items-center justify-center relative min-h-68 md:min-h-2/3">
            <div className="absolute top-2 left-2 bg-red-500 h-3 w-3 rounded-full"></div>
            <div className="absolute top-2 left-6 bg-yellow-500 h-3 w-3 rounded-full"></div>
            <div className="absolute top-2 left-10 bg-green-500 h-3 w-3 rounded-full "></div>
            <img
              src="/Ved.svg"
              className="w-40 h-40 object-cover bg-black shadow-xl hover:ring-blue-500 hover:ring-4 rounded-xl scale-125 shadow-blue-500/50 duration-300"
            />
            
          </div>
          <div className="h-full overflow-hidden px-4 py-2 flex text-justify items-center justify-center flex-col bg-slate-200 dark:bg-slate-950 border-t-2 border-gray-800 dark:border-gray-500 rounded-b-md">
            <h4 className="dark:text-gray-300 text-black font-bold text-xl mb-2">
              Hi, I am Ved Patil
            </h4>
            <p className="dark:text-gray-500 text-gray-700 font-medium text-sm">
              Ved Patil, a computer engineering student at Madhuben and
              Bhanubhai Patel Institute of Technology, developing expertise in
              Web development, AI and innovative tech solutions.
            </p>
          </div>
        </div>
        <div className="flex flex-col border-2 border-gray-800 dark:border-gray-500 rounded-md">
          <Skills />
          <div className="px-4 py-2 flex text-justify items-center justify-center flex-col gap-5 bg-slate-200 dark:bg-slate-950 border-t-2 border-gray-800 dark:border-gray-500 rounded-b-md">
            <h4 className="dark:text-gray-300 text-black font-medium text-xl mb-2">
              My Tool Box
            </h4>
            <p className="dark:text-gray-500 text-gray-700 font-medium text-sm">
              My tech stack includes React, Next.js, Java, JavaScript,
              TypeScript, Python, Node.js, Express, Django, Flask, SQL, MongoDB,
              and TensorFlow. I specialize in building and optimizing
              applications, leveraging Git, GitHub, and VS Code for development
            </p>
          </div>
        </div>
        <div className="flex flex-col border-2 border-gray-800 dark:border-gray-500 rounded-md p-5">
        <h2 className="text-2xl font-bold mb-4">Let's talk</h2>
          <p className="mb-6 text-gray-400">
            Looking to build a website or improve your platform? Let's chat!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400" name="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded dark:bg-gray-800 border border-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400" name="email">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded dark:bg-gray-800 border border-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400" name="message">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded dark:bg-gray-800 border border-gray-700 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Share your thoughts..."
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 dark:bg-slate-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Send Message →
            </button>
            {status && (
              <p className="mt-4 text-center text-gray-300">{status}</p>
            )}
          </form>
        </div>
        <div className="flex flex-col border-2 border-gray-800 dark:border-gray-500 rounded-md pl-6 overflow-hidden">
          <Clock />
          <div className="h-full text-center flex items-center justify-center flex-col gap-5 ml-[-24px] bg-slate-200 dark:bg-slate-950 border-t-2 border-gray-800 dark:border-gray-500 py-2">
            <div className="dark:text-gray-300 text-black font-medium text-md">
              Contact Me
            </div>
            <div
              className="dark:text-gray-500 text-gray-700 font-medium text-lg cursor-pointer"
              onClick={() => {
                handleCopy();
              }}
            >
              <button
                className="cursor-pointer hover:scale-125 duration-300"
                onClick={() => {
                  handleCopy();
                }}
              >
                {isCopied ? (
                  <Check className="inline mr-1 text-green-500" />
                ) : (
                  <Copy className="inline mr-1 dark:text-white" />
                )}
              </button>
              vedpatil13042005@gmail.com
            </div>
            <div className="flex flex-row gap-2 text-center items-center justify-center">
              <div
                className="p-2 text-black dark:text-white border-2 border-black dark:border-white rounded-full cursor-pointer bg-white dark:bg-black"
                onClick={() => {
                  window.open("https://github.com/vedpatil1345", "_blank");
                }}
              >
                <Github size={25} />
              </div>

              <div
                className="p-2 text-white bg-blue-500 dark:text-blue-500 dark:bg-white border-2 border-black dark:border-white rounded-full cursor-pointer"
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/in/ved-patil-a71968250/",
                    "_blank"
                  );
                }}
              >
                <Linkedin size={25} />
              </div>
              <div
                className="p-2 text-white bg-blue-500 dark:text-blue-500 dark:bg-white border-2 border-black dark:border-white rounded-full cursor-pointer"
                onClick={() => {
                  window.open("https://x.com/vedpatil1729", "_blank");
                }}
              >
                <Twitter size={25} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-2 border-gray-800 dark:border-gray-500 rounded-md col-span-2">
        <div className="flex flex-col items-center justify-center h-full overflow-hidden rounded-t-md">
        <embed type="application/pdf" src="/Ved.pdf" width="100%" height="400px"></embed>
        </div>
        <div className=" px-4 py-2 flex text-justify items-center justify-center flex-col gap-5 bg-slate-200 dark:bg-slate-950 border-t-2 border-gray-800 dark:border-gray-500 rounded-b-md">
            <h4 className="dark:text-gray-300 text-black font-medium text-xl mb-2">
              My Resume
            </h4>
            
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
