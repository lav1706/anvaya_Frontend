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
import Kanbanboard from "./pages/Kanbanboard";

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
          <Route path="/status" element={<Kanbanboard />} />
          <Route path="/agents" element={<AgentsDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
