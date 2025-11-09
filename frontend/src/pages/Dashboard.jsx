import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Dashboard() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-100 relative">
      {/* 🌙 Sidebar */}
      <motion.aside
        initial={{ x: -280, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 15 }}
        className={`fixed top-0 left-0 h-full w-64 
        bg-gradient-to-b from-indigo-700/90 via-indigo-800/80 to-purple-900/70 
        backdrop-blur-2xl shadow-2xl border-r border-white/10 z-50 
        transform transition-transform duration-500 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </motion.aside>

      {/* 📱 Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* 📱 Mobile Menu Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-[1.2rem] left-5 z-50 md:hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* 🧭 Main Content */}
      <main className="flex-1 w-full md:ml-64 overflow-y-auto transition-all duration-500">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* ✨ Dashboard Header */}
            <header className="sticky top-0 z-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg rounded-b-3xl px-6 sm:px-8 py-6 mb-8 flex flex-col items-center justify-center md:flex-row md:justify-between md:items-center text-center md:text-left">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-md">
                  JobSelect Dashboard
                </h1>
                <p className="text-indigo-100 text-sm mt-2 max-w-md">
                  Welcome back 👋, let’s manage your platform efficiently!
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-4 md:mt-0 bg-white/20 backdrop-blur-md px-5 py-2 rounded-lg shadow-md text-sm font-medium text-white"
              >
                <span className="text-indigo-50">Active Session</span>
              </motion.div>
            </header>

            {/* 💎 Page Content */}
            <section className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <div className="bg-white/70 backdrop-blur-xl border border-gray-200/70 rounded-3xl shadow-xl p-5 sm:p-8 transition-all duration-500 hover:shadow-2xl">
                <Outlet />
              </div>
            </section>

            {/* 🌈 Decorative Glow Effects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1 }}
              className="absolute bottom-10 right-10 w-44 h-44 bg-purple-400/30 blur-3xl rounded-full"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              transition={{ duration: 1 }}
              className="absolute top-20 left-10 w-52 h-52 bg-indigo-400/30 blur-3xl rounded-full"
            />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
