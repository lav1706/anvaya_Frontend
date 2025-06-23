import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const totalLeadsData = [
    { name: "Closed", value: 45 },
    { name: "In Pipeline", value: 55 },
  ];

  const leadsByAgent = [
    { name: "John", leads: 20 },
    { name: "Jane", leads: 30 },
    { name: "Mark", leads: 15 },
  ];

  const statusDistribution = [
    { name: "New", value: 10 },
    { name: "Contacted", value: 15 },
    { name: "Qualified", value: 8 },
    { name: "Proposal Sent", value: 7 },
    { name: "Closed", value: 20 },
  ];

  const COLORS = ["#6366F1", "#06B6D4", "#F59E0B", "#10B981", "#EF4444"];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-cyan-100 px-4 py-6 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-indigo-800 border-b pb-2 mb-6">
        📊 Anvaya CRM Reports
      </h1>

      <div className="space-y-10">
        {/* Total Leads Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-indigo-700 mb-4">
            Total Leads Closed and In Pipeline
          </h2>
          <div className="w-full h-[250px] sm:h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={totalLeadsData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {totalLeadsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leads Closed by Agent Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-indigo-700 mb-4">
            Leads Closed by Sales Agent
          </h2>
          <div className="w-full h-[250px] sm:h-[300px]">
            <ResponsiveContainer>
              <BarChart data={leadsByAgent}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="leads" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Status Distribution Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-indigo-700 mb-4">
            Lead Status Distribution
          </h2>
          <div className="w-full h-[250px] sm:h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
