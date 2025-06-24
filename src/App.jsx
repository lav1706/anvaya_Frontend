import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import LeadDetails from "./pages/LeadDetails";
import LeadList from "./pages/LeadList";
import NewLead from "./pages/NewLead";
import Agents from "./pages/Agents";
import Reports from "./pages/Reports";
import AddAgents from "./pages/AddAgents";
import AgentsDetails from "./pages/AgentsDetails";
import KanbanBoard from "./pages/KanbanBoard";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/report" element={<Reports />} />
          </Route>
          <Route path="/lead-list/:id" element={<LeadDetails />} />
          <Route path="/lead-list" element={<LeadList />} />
          <Route path="/new-lead" element={<NewLead />} />
          <Route path="/agent" element={<Agents />} />
          <Route path="/new-agent" element={<AddAgents />} />
          <Route path="/status" element={<KanbanBoard />} />
          <Route path="/agents" element={<AgentsDetails />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
