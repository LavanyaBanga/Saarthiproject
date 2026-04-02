import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export default function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const doctor = location.state?.doctor || null;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM",
  ];

  const handleBooking = () => {
    if (!date || !time || !name || !phone) {
      alert("Please fill all details");
      return;
    }

    navigate("/success", {
      state: { name, phone, date, time, doctor },
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-lg border p-8"
      >

        {/* 🔥 Header */}
        <h2 className="text-2xl md:text-3xl font-semibold text-[#5c4b7a] mb-6 text-center">
          Book Appointment
        </h2>

        {/* 👨‍⚕️ Doctor Info */}
        {doctor && (
          <div className="mb-6 p-4 rounded-xl bg-[#f5f3fb] border">
            <p className="font-semibold text-[#5c4b7a]">{doctor.name}</p>
            <p className="text-sm text-gray-500">{doctor.specialization}</p>
          </div>
        )}

        {/* 📅 Date */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
            <Calendar size={16} /> Select Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-xl border outline-none text-sm focus:ring-2 focus:ring-[#7C6A9B]"
          />
        </div>

        {/* ⏰ Time Slots */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-3">
            <Clock size={16} /> Select Time
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {timeSlots.map((slot) => (
              <motion.button
                key={slot}
                onClick={() => setTime(slot)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl text-sm border transition"
                style={{
                  backgroundColor: time === slot ? "#7C6A9B" : "white",
                  color: time === slot ? "white" : "#5c4b7a",
                }}
              >
                {slot}
              </motion.button>
            ))}
          </div>
        </div>

        {/* 👤 Patient Details */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-3">
            <User size={16} /> Patient Details
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-xl border outline-none text-sm focus:ring-2 focus:ring-[#7C6A9B]"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-3 rounded-xl border outline-none text-sm focus:ring-2 focus:ring-[#7C6A9B]"
            />
          </div>
        </div>

        {/* 🚀 Button */}
        <Button
          onClick={handleBooking}
          className="w-full py-3 text-sm font-medium"
          style={{
            backgroundColor: "#7C6A9B",
            color: "white",
          }}
        >
          Confirm Appointment
        </Button>
      </motion.div>
    </div>
  );
}