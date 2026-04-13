import React, { useState } from "react";

const dummyAppointments = [
  {
    id: 1,
    patientName: "Muskan Sharma",
    problem: "Headache",
    time: "10:00 AM",
    status: "pending",
  },
  {
    id: 2,
    patientName: "Sparsh Gupta",
    problem: "Back Pain",
    time: "11:30 AM",
    status: "accepted",
  },
];

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [tab, setTab] = useState("all");

  const changeStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status } : a
      )
    );
  };

  const filtered =
    tab === "all"
      ? appointments
      : appointments.filter((a) => a.status === tab);

  return (
    <div>

      {/* 🔥 FILTER */}
      <div className="flex gap-3 mb-6">
        {["all", "pending", "accepted", "rejected"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl ${
              tab === t ? "bg-[#7C6A9B] text-white" : "bg-gray-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 🔥 CARDS */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((app) => (
          <div key={app.id} className="bg-white p-5 rounded-xl border">

            {/* ✅ PATIENT NAME */}
            <h3 className="text-lg font-semibold text-[#5c4b7a]">
              {app.patientName}
            </h3>

            <p className="text-gray-500">{app.problem}</p>
            <p className="text-sm text-gray-400">{app.time}</p>

            <div className="mt-4">
              {app.status === "pending" ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => changeStatus(app.id, "accepted")}
                    className="flex-1 py-2 bg-[#7C6A9B] text-white rounded-xl"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => changeStatus(app.id, "rejected")}
                    className="flex-1 py-2 border text-[#7C6A9B] rounded-xl"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span className="text-sm font-medium">
                  {app.status.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}