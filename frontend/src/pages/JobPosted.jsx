import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Building2, User, Trash2, Edit3, X } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../api";

export default function JobPosted() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [editJob, setEditJob] = useState(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    lastDate: "",
    driveType: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/api/jobs");
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await API.delete(`/api/jobs/${jobId}`);
        fetchJobs();
      } catch (error) {
        console.error("Error deleting job:", error.response?.data || error.message);
      }
    }
  };

  const handleEdit = (jobData) => {
    setEditJob(jobData._id);
    setForm({
      title: jobData.title,
      company: jobData.company,
      description: jobData.description,
      lastDate: jobData.lastDate.split("T")[0],
      driveType: jobData.driveType,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/api/jobs/${editJob}`, form);
      setEditJob(null);
      fetchJobs();
    } catch (error) {
      console.error("Error updating job:", error.response?.data || error.message);
    }
  };

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-100 overflow-hidden">
      {/* 🌈 Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-300 via-purple-200 to-transparent blur-3xl"
      ></motion.div>

      {/* 🧭 Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3"
      >
        Explore Job Openings 🚀
      </motion.h1>
      <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
        Discover exciting opportunities and apply for jobs that match your passion and skills.
      </p>

      {/* 🗂️ Job Cards */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.length > 0 ? (
          jobs.map((job, i) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* 💼 Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-2xl px-5 py-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Briefcase size={20} /> {job.title}
                </h3>
                <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
                  {job.driveType}
                </span>
              </div>

              {/* 📋 Body */}
              <div className="p-5 space-y-3">
                <p className="text-indigo-600 font-semibold flex items-center gap-1">
                  <Building2 size={16} /> {job.company}
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {job.description.slice(0, 120)}...
                </p>

                <p className="text-xs text-gray-500">
                  📅 Last Date: {new Date(job.lastDate).toLocaleDateString()}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>Posted by {job.user?.name || "Unknown"}</span>
                </div>

                {/* 🧭 Buttons */}
                <div className="pt-3 flex flex-wrap gap-3">
                  <Link
                    to={`/dashboard/apply/${job._id}`}
                    className="flex-1 text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg text-sm font-semibold shadow hover:shadow-lg hover:scale-[1.03] transition"
                  >
                    Apply Now
                  </Link>

                  {user?.email === job.user?.email && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleEdit(job)}
                        className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-white py-2 rounded-lg text-sm font-semibold shadow hover:bg-yellow-500 transition"
                      >
                        <Edit3 size={16} /> Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleDelete(job._id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold shadow hover:bg-red-600 transition"
                      >
                        <Trash2 size={16} /> Delete
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center col-span-3 text-gray-500 mt-10 text-lg"
          >
            No job postings available yet.
          </motion.p>
        )}
      </div>

      {/* ✏️ Edit Job Modal */}
      <AnimatePresence>
        {editJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-gray-100"
            >
              <button
                onClick={() => setEditJob(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                ✏️ Edit Job
              </h2>

              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                />
                <textarea
                  placeholder="Job Description"
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                ></textarea>
                <input
                  type="date"
                  value={form.lastDate}
                  onChange={(e) => setForm({ ...form, lastDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                />
                <select
                  value={form.driveType}
                  onChange={(e) => setForm({ ...form, driveType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">Select Drive Type</option>
                  <option value="Walk-in Drive">Walk-in Drive</option>
                  <option value="Direct Face-to-Face">Direct Face-to-Face</option>
                </select>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:shadow-2xl transition-all"
                >
                  💾 Save Changes
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
