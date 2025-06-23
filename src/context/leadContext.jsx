import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../components/axiosInstance";

const LeadContext = createContext();
export const useLead = () => useContext(LeadContext);

const userId = "684aac4fce05daa7156548a7";
export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axiosInstance.get(`/leads/${userId}`);
        setLeads(res.data.leads);
      } catch (err) {
        console.error("Failed to fetch leads", err);
      }
    };
    fetchLeads();
  }, [trigger]);

  const addLead = async (leadData) => {
    try {
      const res = await axiosInstance.post(`/leads/${userId}/`, leadData);

      setLeads((prev) => [...prev, res.data.lead]);
      setTrigger((pre) => pre + 1);
    } catch (err) {
      console.error("Add lead failed", err);
    }
  };

  const deleteLead = async (leadId) => {
    try {
      await axiosInstance.delete(`/leads/${userId}/${leadId}`);
      setLeads((prev) => prev.filter((lead) => lead._id !== leadId));
    } catch (err) {
      console.error("Delete lead failed", err);
    }
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      await axiosInstance.put(`/leads/${userId}/${leadId}`, {
        status: newStatus,
      });
      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === leadId ? { ...lead, status: newStatus } : lead
        )
      );
    } catch (err) {
      console.error("Update status failed", err);
    }
  };
  const getLeadById = async (leadId) => {
    try {
      const res = await axiosInstance.get(`/leads/${userId}/${leadId}`);
      return res.data.lead;
    } catch (err) {
      console.error("Failed to fetch lead by ID", err);
      return null;
    }
  };
  const editLead = async (leadId, updatedLeadData) => {
    try {
      const res = await axiosInstance.put(
        `/leads/${userId}/${leadId}`,
        updatedLeadData
      );
      return res.data;
    } catch (error) {
      console.error(
        "Error updating lead:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        addLead,
        deleteLead,
        updateLeadStatus,
        setLeads,
        getLeadById,
        editLead,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};
