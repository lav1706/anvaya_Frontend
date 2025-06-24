import React from "react";
import { Link } from "react-router-dom";
import { useAgent } from "../context/agentContext";
import { toast } from "react-toastify";

const Agents = () => {
  const { agents, deleteAgent } = useAgent();

  const handleDelete = (id) => {
    deleteAgent(id);
    toast.error("Agent Deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-cyan-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-indigo-800 border-b pb-2 mb-4 sm:mb-6">
        Sales Agent Management
      </h1>

      <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
        {/* Sidebar */}
        <aside className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/6">
          <Link to="/">
            <button className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition">
              ⬅ Back to Dashboard
            </button>
          </Link>
        </aside>

        {/* Main Content */}
        <main className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex-1">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">
            Sales Agent List
          </h2>

          <ul className="space-y-4 mb-6 max-h-[60vh] overflow-auto">
            {agents.length === 0 ? (
              <p className="text-gray-600">No agents found.</p>
            ) : (
              agents.map((agent) => (
                <li
                  key={agent._id}
                  className="border p-4 rounded-lg bg-indigo-50 hover:shadow transition flex items-center justify-between"
                >
                  <div>
                    <p className="text-lg font-semibold text-indigo-800">
                      Agent: {agent.name}
                    </p>
                    <p className="text-sm text-gray-700">
                      Email: {agent.email}
                    </p>
                  </div>
                  <button
                    className="text-sm border p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                    onClick={() => handleDelete(agent._id)}
                    aria-label={`Delete agent ${agent.name}`}
                  >
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>

          <Link to="/new-agent">
            <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">
              Add New Agent
            </button>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Agents;
