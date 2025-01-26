import React, { useState } from "react";
import { Code, Mail, MessageSquare, Send } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import emailjs from "@emailjs/browser";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        "service_cgm8gjb",
        "template_pupr2dy",
        templateParams,
        "k4AgOiH_khBqSvIJL"
      );

      setShowSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent flex items-center justify-center">
      <Card className="max-w-2xl w-full bg-transparent border-none">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2 gap-4">

            <Mail onClick={()=>{window.open("mailto:vedpatil13045@gmail.com","_blank")}} 
            className="rounded-full p-2 h-12 w-12 text-slate-300 dark:text-indigo-900 fill-indigo-600 dark:fill-indigo-400 transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg dark:shadow-indigo-400/50" />
            <div
              className="p-2 rounded-full inline-block text-xs font-medium uppercase leading-normal text-indigo-600 dark:text-indigo-400 transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg dark:shadow-indigo-400/50"
              title="GitHub"
              aria-label="GitHub"
              onClick={() => window.open("https://wa.me/qr/NJRUCNV5GPXJK1", "_blank")}
            >
              <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
            </div>
            <div
              className="p-2 rounded-full inline-block text-xs font-medium uppercase leading-normal text-indigo-600 dark:text-indigo-400 transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg dark:shadow-indigo-400/50"
              title="GitHub"
              aria-label="GitHub"
              onClick={() => window.open("https://github.com/vedpatil1345", "_blank")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div
              className="p-2 rounded-full inline-block text-xs font-medium uppercase leading-normal text-indigo-600 dark:text-indigo-400 transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg dark:shadow-indigo-400/50"
              title="GitHub"
              aria-label="GitHub"
              onClick={() => window.open("https://www.linkedin.com/in/ved-patil-a71968250/", "_blank")}
            >
              <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>
            </div>            
          </div>
          <CardTitle className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            Let's Collaborate
          </CardTitle>
          <p className="mt-2 text-slate-700 dark:text-slate-300">
            Excited to connect and explore innovative solutions together!
          </p>
        </CardHeader>

        <CardContent>
          <div className="border-2 border-indigo-600 dark:border-indigo-400 bg-gradient-to-br from-slate-200/50 to-indigo-100/20 dark:from-slate-800/90 dark:to-indigo-900/20 rounded-xl shadow-2xl p-8 backdrop-blur-sm">
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            {showSuccess && (
              <Alert className="mb-4 bg-green-500/10 border-green-500/50">
                <AlertDescription className="text-green-500">
                  Thanks for reaching out! I'll get back to you shortly.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-slate-700 dark:text-slate-300 text-sm font-medium block mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <Code className="h-5 w-5 text-indigo-500 dark:text-indigo-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white pl-10 pr-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none border border-slate-300 dark:border-slate-600"
                    placeholder="Ved Patil"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 text-sm font-medium block mb-2">
                  Your Email
                </label>
                <div className="relative">
                  <Mail className="h-5 w-5 text-indigo-500 dark:text-indigo-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white pl-10 pr-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none border border-slate-300 dark:border-slate-600"
                    placeholder="vedpatil13042005@gmail.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 text-sm font-medium block mb-2">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="h-5 w-5 text-indigo-500 dark:text-indigo-400 absolute left-3 top-3" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white pl-10 pr-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none border border-slate-300 dark:border-slate-600 min-h-32 resize-none"
                    placeholder="Tell me about your project idea..."
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || showSuccess}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 text-white py-2 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );

};
export default ContactPage ;
