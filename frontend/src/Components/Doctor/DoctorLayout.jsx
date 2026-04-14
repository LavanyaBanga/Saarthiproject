import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  User
} from "lucide-react";

import DoctorAppointments from "./DoctorAppointments"; // 👈 fix name
import DoctorSchedule from "./DoctorSchedule";

const menu = [
  { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { name: "Appointments", icon: <Calendar size={18} /> },
  { name: "Schedule", icon: <Clock size={18} /> },
];

export default function DoctorLayout() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-[#f9f7fd]">

      {/* 🌸 SIDEBAR */}
      <div className="w-64 bg-white border-r p-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-semibold text-[#7C6A9B] mb-10">
          Saarthi 💜
        </h2>

        <div className="flex flex-col gap-2 flex-1">
          {menu.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition ${
                active === item.name
                  ? "bg-[#7C6A9B] text-white"
                  : "text-gray-600 hover:bg-[#f3effa]"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-400">
          Logged in as Doctor 👨‍⚕️
        </div>
      </div>

      {/* 🌸 MAIN */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-[#5c4b7a]">
            {active}
          </h1>

          <div className="px-4 py-2 rounded-xl bg-white border text-sm">
            Dr. Sharma
          </div>
        </div>

        {/* 🔥 CONTENT SWITCH */}
        {active === "Dashboard" && <Dashboard />}
        {active === "Appointments" && <DoctorAppointments />}
        {active === "Schedule" && <DoctorSchedule />}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Patients", value: "120+" },
          { title: "Today", value: "8" },
          { title: "Upcoming", value: "15" },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-sm border"
          >
            <p className="text-gray-500 text-sm">{card.title}</p>
            <h2 className="text-2xl font-semibold text-[#5c4b7a]">
              {card.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* RECENT APPOINTMENTS */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <h2 className="text-lg font-semibold text-[#5c4b7a] mb-4">
          Recent Appointments
        </h2>

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex justify-between p-4 border rounded-xl mb-2"
          >
            <div>
              <p className="font-medium">Patient {i}</p>
              <p className="text-sm text-gray-500">
                02 Apr • 10:00 AM
              </p>
            </div>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
              Upcoming
            </span>
          </div>
        ))}
      </div>
    </>
  );
}