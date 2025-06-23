import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { Link } from "react-router-dom";
import { useLead } from "../context/leadContext";

const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

const KanbanBoard = () => {
  const { leads, updateLeadStatus } = useLead();
  const [lead, setLead] = useState(leads);

  useEffect(() => {
    setLead(leads);
  }, [leads]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const draggedLead = lead.find((l) => l._id === active.id);
      const newStatus = over.id;

      if (draggedLead && draggedLead.status !== newStatus) {
        await updateLeadStatus(active.id, newStatus);

        const updatedLeads = lead.map((l) =>
          l._id === active.id ? { ...l, status: newStatus } : l
        );
        setLead(updatedLeads);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-cyan-100 p-6 ">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/6">
          <Link to="/">
            <button className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition">
              ⬅ Back to Dashboard
            </button>
          </Link>
        </aside>

        {/* Kanban Board */}
        <main className="bg-white rounded-lg shadow-md p-6 flex-1 space-y-6 ">
          <h1 className="text-3xl font-bold text-indigo-800 mb-6">
            Lead Management
          </h1>
          <DndContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {statuses.map((status) => (
                <StatusColumn
                  key={status}
                  status={status}
                  leads={lead.filter((lead) => lead.status === status)}
                />
              ))}
            </div>
          </DndContext>
        </main>
      </div>
    </div>
  );
};

// === Status Column Component ===
const StatusColumn = ({ status, leads }) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className="w-full md:w-1/5 bg-white rounded-lg shadow-md p-4"
    >
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">
        {status} ({leads.length})
      </h2>
      <div className="space-y-4">
        {leads.map((lead) => (
          <LeadCard key={lead._id} lead={lead} />
        ))}
      </div>
    </div>
  );
};

// === Lead Card Component ===
const LeadCard = ({ lead }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: lead._id,
    });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-4 bg-white rounded-lg shadow-md border ${
        isDragging ? "border-indigo-500" : "border-gray-300"
      }`}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        zIndex: isDragging ? 1000 : "auto",
      }}
    >
      <h3 className="font-semibold text-indigo-700">{lead.name}</h3>
    </div>
  );
};

export default KanbanBoard;
