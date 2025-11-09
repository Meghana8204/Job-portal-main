import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import API from "../api";

export default function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    collegeName: "",
    tenthPercentage: "",
    degreePercentage: "",
    selectedLanguage: "",
    communication: 0,
    resume: null,
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await API.get(`/api/jobs/${id}`);
        setJob(data);
      } catch {
        toast.error("Failed to fetch job details");
      }
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("jobId", id);

    Object.keys(form).forEach((key) => {
      if (key === "resume" && form.resume) {
        fd.append("resume", form.resume);
      } else {
        fd.append(key, form[key]);
      }
    });

    try {
      await API.post("/api/applications", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("✅ Application submitted successfully!");
      navigate("/dashboard/jobs");
    } catch {
      toast.error("❌ Failed to apply. Try again.");
    }
  };

  if (!job) return <p className="text-center mt-10">Loading job details...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50"
    >
      {/* 🌈 Floating glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-300/30 via-purple-200/20 to-transparent blur-3xl"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* 💼 Job Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Apply for {job.title}
          </h2>
          <p className="text-gray-600 mt-2">{job.company}</p>
        </div>

        {/* 🧾 Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300 hover:shadow-2xl"
        >
          {/* 🧍 Basic Details */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-100 rounded-md p-2.5"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-100 rounded-md p-2.5"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-100 rounded-md p-2.5"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                College Name
              </label>
              <input
                type="text"
                value={form.collegeName}
                onChange={(e) => setForm({ ...form, collegeName: e.target.value })}
                className="w-full border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-100 rounded-md p-2.5"
                required
              />
            </div>
          </div>

          {/* 🎓 Education Details */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                10th Marks (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.tenthPercentage}
                onChange={(e) =>
                  setForm({ ...form, tenthPercentage: e.target.value })
                }
                className="w-full border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-100 rounded-md p-2.5"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Degree Marks (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.degreePercentage}
                onChange={(e) =>
                  setForm({ ...form, degreePercentage: e.target.value })
                }
                className="w-full border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-100 rounded-md p-2.5"
                required
              />
            </div>
          </div>

          {/* 💻 Preferred Language */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Preferred Programming Language
            </h3>
            <div className="flex flex-wrap gap-3">
              {["Java", "Python", "MERN", "Software Testing"].map((lang) => (
                <label
                  key={lang}
                  className={`flex items-center gap-2 border rounded-lg px-3 py-1.5 cursor-pointer text-sm font-medium transition-all
                    ${
                      form.selectedLanguage === lang
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "hover:bg-indigo-50 border-gray-300 text-gray-700"
                    }`}
                >
                  <input
                    type="radio"
                    name="selectedLanguage"
                    value={lang}
                    checked={form.selectedLanguage === lang}
                    onChange={(e) =>
                      setForm({ ...form, selectedLanguage: e.target.value })
                    }
                    className="hidden"
                    required
                  />
                  {lang}
                </label>
              ))}
            </div>
          </div>

          {/* 🗣️ Communication Skill */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Communication Skill (1–10)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={form.communication}
              onChange={(e) =>
                setForm({ ...form, communication: e.target.value })
              }
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-100 rounded-md p-2.5"
              required
            />
          </div>

          {/* 📎 Resume Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Upload Resume
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setForm({ ...form, resume: e.target.files[0] })}
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-100 rounded-md p-2.5"
              required
            />
          </div>

          {/* ✅ Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Submit Application
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
