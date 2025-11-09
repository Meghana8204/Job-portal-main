import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, TrendingUp, ArrowUpRight } from "lucide-react";

const data = [
  { name: "Week 1", applicants: 15 },
  { name: "Week 2", applicants: 30 },
  { name: "Week 3", applicants: 45 },
  { name: "Week 4", applicants: 60 },
];

export default function CustomerAnalysis() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 py-16 px-6 sm:px-10 overflow-hidden">
      {/* 🌈 Ambient Glow Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-300 via-purple-200 to-transparent blur-3xl"
      ></motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ✨ Page Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Customer Analytics Dashboard
          </motion.h1>
          <p className="text-gray-600 mt-3 text-lg">
            Insights into your weekly applicant growth & performance trends 📈
          </p>
        </div>

        {/* 📊 Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {/* 🧍‍♂️ Total Applicants */}
          <div className="group bg-white/70 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-lg p-6 flex items-center justify-between hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            <div>
              <h3 className="text-gray-600 text-sm font-medium">
                Total Applicants
              </h3>
              <p className="text-3xl font-bold text-indigo-700 mt-1">150+</p>
            </div>
            <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-inner group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
          </div>

          {/* 📈 Monthly Growth */}
          <div className="group bg-white/70 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-lg p-6 flex items-center justify-between hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            <div>
              <h3 className="text-gray-600 text-sm font-medium">
                Monthly Growth
              </h3>
              <p className="text-3xl font-bold text-purple-700 mt-1">
                ↑ 40%
              </p>
            </div>
            <div className="bg-purple-600 text-white p-3 rounded-xl shadow-inner group-hover:scale-110 transition-transform">
              <TrendingUp size={28} />
            </div>
          </div>

          {/* 🚀 Conversion Rate */}
          <div className="group bg-white/70 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-lg p-6 flex items-center justify-between hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            <div>
              <h3 className="text-gray-600 text-sm font-medium">
                Conversion Rate
              </h3>
              <p className="text-3xl font-bold text-green-600 mt-1">
                76%
              </p>
            </div>
            <div className="bg-green-600 text-white p-3 rounded-xl shadow-inner group-hover:scale-110 transition-transform">
              <ArrowUpRight size={28} />
            </div>
          </div>
        </motion.div>

        {/* 📈 Line Chart Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            Weekly Applicants Overview
            <span className="text-indigo-600 text-sm font-medium">
              (Last 4 Weeks)
            </span>
          </h3>

          <ResponsiveContainer width="100%" height={380}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                }}
                itemStyle={{ color: "#4F46E5", fontWeight: 500 }}
              />
              <Line
                type="monotone"
                dataKey="applicants"
                stroke="url(#colorGradient)"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: "#4F46E5",
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
                activeDot={{
                  r: 8,
                  fill: "#9333EA",
                  strokeWidth: 3,
                  stroke: "#fff",
                }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
