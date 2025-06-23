import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLead } from "../context/leadContext";

const Dashboard = () => {
  const [filter, setFilter] = useState("All");
  const { leads, loading } = useLead();

  const filteredLeads =
    filter === "All" ? leads : leads.filter((lead) => lead.status === filter);

  const handleFilterClick = (status) => {
    setFilter(status);
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 md:p-6">
      <h1 className="font-extrabold text-3xl border-b pb-4 mb-6">Dashboard</h1>

      <section>
        <h2 className="text-2xl border-b py-3 px-2 mb-4">Lead Status:</h2>
        <ul className="flex flex-wrap gap-4 justify-center md:justify-start">
          <li className="flex justify-center items-center text-xl h-20 w-28 bg-blue-300 text-black rounded-md shadow-sm">
            Total: {leads.length}
          </li>
          <li className="flex justify-center items-center text-xl h-20 w-28 bg-gray-300 text-black rounded-md shadow-sm">
            New: {leads.filter((l) => l.status === "New").length}
          </li>
          <li className="flex justify-center items-center text-xl h-20 w-28 bg-yellow-300 text-black rounded-md shadow-sm">
            Contacted: {leads.filter((l) => l.status === "Contacted").length}
          </li>
          <li className="flex justify-center items-center text-xl h-20 w-28 bg-green-300 text-black rounded-md shadow-sm">
            Qualified: {leads.filter((l) => l.status === "Qualified").length}
          </li>
          <li className="flex justify-center items-center text-xl h-20 w-28 bg-red-300 text-black rounded-md shadow-sm">
            Closed: {leads.filter((l) => l.status === "Closed").length}
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl border-b border-t py-3 px-2 mb-4">
          Quick Filters:
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div className="flex flex-wrap gap-3 px-2">
            {["All", "New", "Contacted", "Qualified", "Closed"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => handleFilterClick(status)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition cursor-pointer
                  ${
                    filter === status
                      ? "bg-indigo-500 text-white border-indigo-500"
                      : "bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-50"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                >
                  {status}
                </button>
              )
            )}
          </div>
          <Link
            to="/new-lead"
            className="px-5 py-2 rounded-full border text-sm font-medium text-indigo-700 border-indigo-300 bg-white hover:bg-indigo-50 transition cursor-pointer"
          >
            Add Lead
          </Link>
        </div>
      </section>

      <section className="mt-8 px-2 md:px-0">
        <h3 className="text-xl font-semibold mb-4">Filtered Leads:</h3>
        {filteredLeads.length === 0 ? (
          <p className="text-gray-500">No leads found for this filter.</p>
        ) : (
          <ul className="space-y-2">
            {filteredLeads.map((lead) => (
              <li
                key={lead.id || lead.name}
                className="bg-indigo-50 p-3 rounded border border-indigo-100 hover:shadow cursor-default"
              >
                {lead.name} —{" "}
                <span className="text-sm text-gray-600">{lead.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
