import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLead } from "../context/leadContext";
import { useAgent } from "../context/agentContext";

const LeadList = () => {
  const { leads = [], deleteLead } = useLead();
  const { agents = [] } = useAgent();

  const [filterStatus, setFilterStatus] = useState("");
  const [filterAgent, setFilterAgent] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [agentList, setAgentList] = useState([]);

  useEffect(() => {
    setAgentList(agents);
  }, [agents]);

  const filteredLeads = leads
    .filter((lead) => {
      const statusMatch = !filterStatus || lead.status === filterStatus;
      const agentMatch = !filterAgent || lead.agent === filterAgent;
      return statusMatch && agentMatch;
    })
    .sort((a, b) => {
      if (sortKey === "Priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortKey === "Time") {
        return a.timeToClose - b.timeToClose;
      }
      return 0;
    });

  const handleDelete = async (id) => {
    console.log("Deleting lead ID:", id);
    await deleteLead(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-cyan-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-indigo-800 border-b pb-2 mb-6">
        Lead List
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/6">
          <Link
            to="/"
            className="block text-center w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
          >
            ⬅ Back to Dashboard
          </Link>
        </aside>

        {/* Main Content */}
        <main className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">
            Lead Overview
          </h2>

          {/* Filters & Sort */}
          <div className="flex flex-col sm:flex-wrap sm:flex-row gap-4 mb-6">
            {/* Status Filter */}
            <select
              onChange={(e) => setFilterStatus(e.target.value)}
              value={filterStatus}
              className="w-full sm:w-auto px-3 py-2 border rounded"
            >
              <option value="">Filter by Status</option>
              <option value="New">New</option>
              <option value="Qualified">Qualified</option>
              <option value="Contacted">Contacted</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>

            {/* Agent Filter */}
            <select
              onChange={(e) => setFilterAgent(e.target.value)}
              value={filterAgent}
              className="w-full sm:w-auto px-3 py-2 border rounded"
            >
              <option value="">Filter by Sales Agent</option>
              {agentList.map((agent) => (
                <option key={agent._id} value={agent.name}>
                  {agent.name}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              onChange={(e) => setSortKey(e.target.value)}
              value={sortKey}
              className="w-full sm:w-auto px-3 py-2 border rounded"
            >
              <option value="">Sort by</option>
              <option value="Priority">Priority</option>
              <option value="Time">Time to Close</option>
            </select>

            {/* Actions */}
            <Link
              to="/status"
              className="w-full sm:w-auto text-center px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
            >
              Update Status
            </Link>

            <Link
              to="/new-lead"
              className="w-full sm:w-auto text-center px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
            >
              ➕ Add New Lead
            </Link>
          </div>

          {/* Lead List */}
          <ul className="space-y-4">
            {filteredLeads.map((lead) => (
              <li
                key={lead._id}
                className="border p-4 rounded-lg hover:shadow transition bg-indigo-50"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <Link to={`/lead-list/${lead._id}`} className="flex-1 block">
                    <p className="text-lg font-semibold text-indigo-800">
                      {lead.name}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      Status: <strong>{lead.status}</strong> | Agent:{" "}
                      <strong>{lead.agent}</strong>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Priority: {lead.priority} | Time to Close:{" "}
                      {lead.timeToClose} Days
                    </p>
                  </Link>
                  <button
                    onClick={() => handleDelete(lead._id)}
                    className="text-sm w-full sm:w-auto px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}

            {/* No leads message */}
            {filteredLeads.length === 0 && (
              <p className="text-gray-600 text-sm">
                No leads match the selected filters.
              </p>
            )}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default LeadList;
