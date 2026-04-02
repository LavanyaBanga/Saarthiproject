import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  LayoutDashboard,
  ClipboardList,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("Appointments");
  const [tab, setTab] = useState("Upcoming");

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Sharma",
      specialization: "ENT",
      date: "2026-04-02",
      time: "10:00 AM",
      status: "Upcoming",
    },
    {
      id: 2,
      doctor: "Dr. Mehta",
      specialization: "Cardiologist",
      date: "2026-03-20",
      time: "2:00 PM",
      status: "Completed",
    },
    {
      id: 3,
      doctor: "Dr. Singh",
      specialization: "Dermatologist",
      date: "2026-03-25",
      time: "12:00 PM",
      status: "Cancelled",
    },
  ]);

  const cancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "Cancelled" } : a
      )
    );
  };

  const filtered = appointments.filter((a) => a.status === tab);

  const sidebarItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Appointments", icon: <ClipboardList size={18} /> },
    { name: "Profile", icon: <User size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#fafafa]">

      
      <div className="w-64 bg-white border-r p-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-semibold text-[#7C6A9B] mb-10">
          Saarthi
        </h2>

        <div className="flex flex-col gap-2 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition ${
                activePage === item.name
                  ? "bg-[#7C6A9B] text-white shadow"
                  : "text-gray-600 hover:bg-[#f3effa]"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* 🌸 MAIN */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-[#5c4b7a]">
            My Appointments
          </h1>

          <button
            onClick={() => navigate("/doctor")}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-[#7C6A9B] text-white hover:scale-105 transition"
          >
            + Book Appointment
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-3 mb-6">
          {["Upcoming", "Completed", "Cancelled"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                tab === t
                  ? "bg-[#7C6A9B] text-white"
                  : "bg-white border text-gray-600 hover:bg-[#f3effa]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filtered.map((appt, index) => (
            <motion.div
              key={appt.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >

              {/* Doctor Info */}
              <h2 className="text-lg font-semibold text-[#5c4b7a]">
                {appt.doctor}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                {appt.specialization}
              </p>

              {/* Date + Time */}
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} /> {appt.date}
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Clock size={16} /> {appt.time}
              </p>

              {/* STATUS */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  appt.status === "Upcoming"
                    ? "bg-[#ede9f7] text-[#7C6A9B]"
                    : appt.status === "Completed"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {appt.status}
              </span>

              {/* ACTIONS */}
              {appt.status === "Upcoming" && (
                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => cancelAppointment(appt.id)}
                    className="flex-1 py-2 rounded-xl text-sm font-medium border text-red-500 hover:bg-red-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() =>
                      navigate("/booking", { state: appt })
                    }
                    className="flex-1 py-2 rounded-xl text-sm font-medium bg-[#7C6A9B] text-white hover:scale-105 transition"
                  >
                    Reschedule
                  </button>

                </div>
              )}
            </motion.div>
          ))}

          {/* EMPTY STATE */}
          {filtered.length === 0 && (
            <div className="col-span-full text-center mt-10">
              <p className="text-gray-400 mb-4">
                No {tab.toLowerCase()} appointments
              </p>

              <button
                onClick={() => navigate("/doctor")}
                className="px-5 py-2 rounded-xl bg-[#7C6A9B] text-white text-sm"
              >
                Book Now
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}