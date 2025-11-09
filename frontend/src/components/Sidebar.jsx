import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { logout } from "../api";
import {
  Home,
  Briefcase,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const links = [
  { path: "/dashboard/jobs", label: "Job Posted", icon: <Briefcase size={20} /> },
  { path: "/dashboard/new", label: "Post Job", icon: <Home size={20} /> },
  { path: "/dashboard/analysis", label: "Analysis", icon: <BarChart3 size={20} /> },
  { path: "/dashboard/profile", label: "Profile", icon: <User size={20} /> },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* 📱 Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-9 left-4 z-50 p-2 rounded-md bg-indigo-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 🧭 Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed lg:static top-0 left-0 z-40 w-64 min-h-screen bg-gradient-to-b from-indigo-700 to-indigo-900 text-white flex flex-col justify-between p-6 shadow-2xl"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold mb-8 text-center tracking-wide"
              >
                Job<span className="text-indigo-300">Select</span>
              </motion.h2>

              {/* 🌐 Navigation */}
              <nav className="space-y-2">
                {links.map((link) => (
                  <motion.div
                    key={link.path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-white text-indigo-700 font-semibold shadow-md"
                            : "hover:bg-indigo-600"
                        }`
                      }
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* 🚪 Logout */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 mt-6 rounded-lg bg-red-500/90 hover:bg-red-600 transition text-white font-semibold shadow-md"
              >
                <LogOut size={18} /> Logout
              </motion.button>
            </div>

            {/* 🧾 Footer */}
            <p className="text-xs text-indigo-200 text-center mt-6">
              © {new Date().getFullYear()}{" "}
              <span className="text-white">JobSelect</span>
            </p>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
