import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../components/axiosInstance";

const AgentContext = createContext();
export const useAgent = () => useContext(AgentContext);

const userId = "684aac4fce05daa7156548a7";
export const AgentProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axiosInstance.get(`/agent/${userId}`);
        setAgents(res.data.agents);
      } catch (err) {
        console.error("Failed to fetch leads", err);
      }
    };
    fetchAgents();
  }, [trigger]);
  console.log(agents);

  const addAgents = async (agentData) => {
    try {
      const res = await axiosInstance.post(`/agent`, agentData);
      setAgents((prev) => [...prev, res.data]);
      setTrigger((pre) => pre + 1);
    } catch (err) {
      console.error("Add Agent failed", err);
    }
  };

  const deleteAgent = async (agentId) => {
    try {
      await axiosInstance.delete(`/agent/${userId}/${agentId}`);
      setAgents((prev) => prev.filter((agent) => agent._id !== agentId));
      setTrigger((pre) => pre + 1);
    } catch (err) {
      console.error("Delete lead failed", err);
    }
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      await axiosInstance.put(`/leads/${userId}/${leadId}`, {
        status: newStatus,
      });
      setAgents((prev) =>
        prev.map((lead) =>
          lead._id === leadId ? { ...lead, status: newStatus } : lead
        )
      );
    } catch (err) {
      console.error("Update status failed", err);
    }
  };
  const getLeadById = async () => {
    try {
      const res = await axiosInstance.get(`/leads/${userId}`);
      return res.data;
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
    <AgentContext.Provider
      value={{
        agents,
        addAgents,
        deleteAgent,
        updateLeadStatus,
        setAgents,
        getLeadById,
        editLead,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};
