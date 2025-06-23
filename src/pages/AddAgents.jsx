import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAgent } from "../context/agentContext";

const AddAgents = () => {
  const { addAgents } = useAgent();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, email };
    console.log("Agent submitted:", payload);
    addAgents(payload);
    setName("");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-cyan-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-indigo-800 border-b pb-2 mb-4 sm:mb-6">
        Add New Sales Agent
      </h1>

      <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
        {/* Sidebar */}
        <aside className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/4">
          <Link to="/">
            <button className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition">
              ⬅ Back to Dashboard
            </button>
          </Link>
        </aside>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex-1 space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium text-sm sm:text-base">
              Agent Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="Enter agent name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm sm:text-base">
              Email Address:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="Enter email address"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition text-sm sm:text-base"
          >
            Create Agent
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAgents;
