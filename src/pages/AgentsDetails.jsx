import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const AgentsDetails = () => {
  const { agentId } = useParams();
  const [agent, setAgent] = useState({});
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({ status: "", priority: "" });

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "" });

  useEffect(() => {
    // Simulated fetch
    const agentData = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    };

    const agentLeads = [
      { id: 101, name: "Lead 1", status: "New", priority: "High" },
      { id: 102, name: "Lead 2", status: "Qualified", priority: "Low" },
      { id: 103, name: "Lead 3", status: "Contacted", priority: "Medium" },
    ];

    setAgent(agentData);
    setEditData({ name: agentData.name, email: agentData.email });
    setLeads(agentLeads);
  }, [agentId]);

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editData.name.trim() || !editData.email.trim())
      return alert("All fields required");
    setAgent(editData);
    setEditMode(false);
  };

  const filteredLeads = leads.filter((lead) => {
    const statusMatch = filters.status ? lead.status === filters.status : true;
    const priorityMatch = filters.priority
      ? lead.priority === filters.priority
      : true;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-cyan-100 p-6">
      <h1 className="text-3xl font-bold text-indigo-800 border-b pb-2 mb-6">
        Leads by Sales Agent
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/6">
          <Link to="/">
            <button className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition">
              ⬅ Back to Dashboard
            </button>
          </Link>
        </aside>

        {/* Main Content */}
        <main className="bg-white rounded-lg shadow-md p-6 flex-1">
          {/* Agent Info */}
          {!editMode ? (
            <>
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                Sales Agent: {agent.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">Email: {agent.email}</p>
              <button
                onClick={() => setEditMode(true)}
                className="mb-6 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
              >
                ✏️ Edit Agent
              </button>
            </>
          ) : (
            <form onSubmit={handleSave} className="space-y-4 mb-6">
              <div>
                <label className="block font-medium mb-1">Agent Name:</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Email:</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleEditChange("email", e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  ✅ Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              className="border rounded px-3 py-2"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">Filter by Status</option>
              <option value="New">New</option>
              <option value="Qualified">Qualified</option>
              <option value="Contacted">Contacted</option>
            </select>

            <select
              className="border rounded px-3 py-2"
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value })
              }
            >
              <option value="">Filter by Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Leads List */}
          <ul className="space-y-4">
            {filteredLeads.map((lead) => (
              <li
                key={lead.id}
                className="border p-4 rounded-lg bg-indigo-50 hover:shadow transition"
              >
                <p className="text-lg font-semibold text-indigo-800">
                  {lead.name}
                </p>
                <p className="text-sm text-gray-700">Status: {lead.status}</p>
                <p className="text-sm text-gray-700">
                  Priority: {lead.priority}
                </p>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default AgentsDetails;
