import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLead } from "../context/leadContext";
import { useComment } from "../context/CommentContext";
import { toast } from "react-toastify";

const LeadDetails = () => {
  const { id } = useParams();
  const { leads, editLead, setLeads } = useLead();
  const { commentByLead, addComment, deleteComment } = useComment();

  const selectedLead = leads.find((lead) => lead._id === id);
  const [editMode, setEditMode] = useState(false);

  const [editData, setEditData] = useState({
    status: selectedLead?.status || "",
    priority: selectedLead?.priority || "",
    timeToClose: selectedLead?.timeToClose || "",
    name: selectedLead?.name || "",
    source: selectedLead?.source || "",
    salesAgent: selectedLead?.salesAgent || "",
  });

  const [leadDetails, setLeadDetails] = useState(selectedLead);

  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (selectedLead) {
      setLeadDetails(selectedLead);
      setEditData(selectedLead);
    }
  }, [selectedLead]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await commentByLead(selectedLead._id);
        setCommentList(res);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    if (selectedLead?._id) {
      fetchComments();
    }
  }, [selectedLead?._id]);

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
    toast.success("Lead Updated successfully!");
  };

  const handleSaveEdit = () => {
    if (
      !editData.status ||
      !editData.priority ||
      !editData.timeToClose ||
      !editData.name ||
      !editData.source
    )
      return alert("All fields are required.");

    const updatedLead = { ...leadDetails, ...editData };
    editLead(leadDetails._id, updatedLead);
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead._id === leadDetails._id ? updatedLead : lead
      )
    );
    setEditMode(false);
  };

  const handleCommentSubmit = async (id) => {
    if (!newComment.trim()) return;

    try {
      await addComment(id, newComment);
      const updatedComments = await commentByLead(id);
      setCommentList(updatedComments);
      toast.success("Comment Added successfully!");
      setNewComment("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
      toast.error("Comment not added");
    }
  };

  const handleDeleteCommentSubmit = async (id) => {
    try {
      await deleteComment(id);

      const updatedComments = await commentByLead(selectedLead._id);
      setCommentList(updatedComments);
      toast.success("Comment Deleted successfully!");
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Comment not Deleted");
    }
  };

  if (!selectedLead) {
    return (
      <div className="p-6 text-center text-red-600">
        Lead not found. <Link to="/">Go back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-cyan-100 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 border-b pb-2 text-indigo-800">
        Lead Management: {leadDetails?.name}
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/6 flex-shrink-0">
          {/* Fix button/link wrapping so entire button is clickable */}
          <Link
            to="/"
            className="block text-center bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
          >
            ⬅ Back to Dashboard
          </Link>
        </aside>

        <main className="bg-white rounded-lg shadow-md p-6 flex-1 space-y-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">
            Lead Details
          </h2>

          {!editMode ? (
            <div className="space-y-3 text-gray-800 text-sm sm:text-base">
              <p>
                <strong>Lead Name:</strong> {leadDetails?.name}
              </p>
              <p>
                <strong>Sales Agent:</strong>{" "}
                {leadDetails?.salesAgent?.name || "N/A"}
              </p>
              <p>
                <strong>Lead Source:</strong> {leadDetails?.source}
              </p>
              <p>
                <strong>Lead Status:</strong> {leadDetails?.status}
              </p>
              <p>
                <strong>Priority:</strong> {leadDetails?.priority}
              </p>
              <p>
                <strong>Time to Close:</strong> {leadDetails?.timeToClose} Days
              </p>

              <button
                className="mt-4 w-full sm:w-auto px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                onClick={() => setEditMode(true)}
              >
                Edit Lead Details
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Editable fields */}
              {["name", "source", "status", "priority", "timeToClose"].map(
                (field, idx) => (
                  <div key={idx}>
                    <label
                      htmlFor={field}
                      className="block font-medium mb-1 capitalize"
                    >
                      {field === "timeToClose" ? "Time to Close (days)" : field}
                    </label>
                    {field === "status" ||
                    field === "priority" ||
                    field === "source" ? (
                      <select
                        id={field}
                        value={editData[field]}
                        onChange={(e) =>
                          handleEditChange(field, e.target.value)
                        }
                        className="w-full border px-3 py-2 rounded focus:outline-indigo-500"
                      >
                        <option value="">Select {field}</option>
                        {field === "status" &&
                          ["New", "Contacted", "Qualified", "Closed"].map(
                            (opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            )
                          )}
                        {field === "priority" &&
                          ["High", "Medium", "Low"].map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        {field === "source" &&
                          ["Referral", "Website", "Cold Call"].map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <input
                        id={field}
                        type={field === "timeToClose" ? "number" : "text"}
                        value={editData[field]}
                        onChange={(e) =>
                          handleEditChange(field, e.target.value)
                        }
                        className="w-full border px-3 py-2 rounded focus:outline-indigo-500"
                      />
                    )}
                  </div>
                )
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Comments Section */}
      <section className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-indigo-700 mb-4">Comments</h2>

        <div className="space-y-4">
          {commentList?.length > 0 ? (
            commentList.map((comment) => (
              <div
                key={comment._id}
                className="border rounded p-3 flex flex-col sm:flex-row justify-between gap-3"
              >
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>{comment.author?.name || "Anonymous"}</strong> -{" "}
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-1 text-gray-800 break-words">
                    {comment.commentText}
                  </p>
                </div>
                <button
                  aria-label="Delete comment"
                  className="self-start text-xs border p-2 bg-indigo-500 text-white py-1 rounded hover:bg-indigo-600 transition"
                  onClick={() => handleDeleteCommentSubmit(comment._id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No Comments...</p>
          )}
        </div>

        <div className="mt-6 space-y-2">
          <textarea
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a new comment..."
            className="w-full p-2 border rounded resize-none focus:outline-indigo-500"
          />
          <button
            onClick={() => handleCommentSubmit(selectedLead._id)}
            className="w-full sm:w-auto px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            Submit Comment
          </button>
        </div>
      </section>
    </div>
  );
};

export default LeadDetails;
