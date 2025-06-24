import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLead } from "../context/leadContext";
import { useAgent } from "../context/agentContext";
import { useTag } from "../context/tagContext";
import { toast } from "react-toastify";

const NewLead = () => {
  const { addLead } = useLead();
  const { agents } = useAgent();
  const { tags, addTag, deleteTag } = useTag();
  const [showAddTagForm, setShowAddTagForm] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  const [leadData, setLeadData] = useState({
    name: "",
    source: "",
    status: "",
    priority: "",
    timeToClose: "",
    tags: [],
    salesAgent: "",
  });
  const cleanForm = () => {
    setLeadData({
      name: "",
      source: "",
      status: "",
      priority: "",
      timeToClose: "",
      tags: [],
      salesAgent: "",
    });
  };
  const handleChange = (field, value) => {
    setLeadData({ ...leadData, [field]: value });
  };

  const handleMultiSelect = (field, value) => {
    setLeadData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lead submitted:", leadData);
    addLead(leadData);
    toast.success("Lead Added successfully!");
    cleanForm();
  };

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;

    const isDuplicate = tags.some(
      (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert("Tag already exists!");
      return;
    }

    await addTag(newTagName);
    toast.success("Tag Added successfully!");
    setNewTagName("");
    setShowAddTagForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-cyan-100 p-6">
      <h1 className="text-3xl font-bold text-indigo-800 border-b pb-2 mb-6">
        Add New Lead
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/6">
          <Link to="/">
            <button className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition">
              ⬅ Back to Dashboard
            </button>
          </Link>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 flex-1 space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">Lead Name:</label>
            <input
              type="text"
              value={leadData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Lead Source:</label>
            <select
              value={leadData.source}
              onChange={(e) => handleChange("source", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select source</option>
              <option value="Referral">Referral</option>
              <option value="Website">Website</option>
              <option value="Cold Call">Cold Call</option>
            </select>
          </div>

          {/* Sales Agent (Multi-select) */}
          <div>
            <label className="block mb-1 font-medium">Sales Agent:</label>
            <div className="flex flex-wrap gap-2">
              {agents.map((agent) => (
                <button
                  key={agent._id}
                  type="button"
                  onClick={() => handleChange("salesAgent", agent._id)}
                  className={`px-3 py-1 rounded border ${
                    leadData.salesAgent === agent._id
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-indigo-700 border-indigo-300"
                  }`}
                >
                  {agent.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Lead Status:</label>
            <select
              value={leadData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block mb-1 font-medium">Priority:</label>
            <select
              value={leadData.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Time to Close */}
          <div>
            <label className="block mb-1 font-medium">
              Time to Close (Days):
            </label>
            <input
              type="number"
              value={leadData.timeToClose}
              onChange={(e) => handleChange("timeToClose", e.target.value)}
              className="w-full p-2 border rounded"
              min="1"
            />
          </div>

          {/* Tags (Multi-select) */}
          <div>
            <label className="block mb-1 font-medium">Tags:</label>
            <div className="flex flex-wrap gap-2">
              {tags.length > 0 ? (
                <>
                  {tags.map((tag) => (
                    <div key={tag._id} className="relative group">
                      <button
                        type="button"
                        onClick={() => handleMultiSelect("tags", tag)}
                        className={`px-3 py-1 rounded border flex items-center gap-2 ${
                          leadData.tags.includes(tag)
                            ? "bg-indigo-500 text-white"
                            : "bg-white text-indigo-700 border-indigo-300"
                        }`}
                      >
                        {tag.name}
                      </button>
                      <button
                        onClick={() => deleteTag(tag._id)}
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 hidden group-hover:block"
                        title="Delete tag"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => setShowAddTagForm(true)}
                    className="px-3 py-1 rounded border border-dashed text-indigo-500 hover:border-indigo-500"
                  >
                    + Add Tag
                  </button>

                  {showAddTagForm && (
                    <div className="flex gap-2 mt-2 w-full">
                      <input
                        type="text"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        className="border p-2 rounded flex-1"
                        placeholder="New tag name"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p>No Tags</p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
            >
              Create Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewLead;
