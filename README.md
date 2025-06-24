
# 🚀 Anvaya CRM – Frontend

**Anvaya CRM Frontend** is a modern and intuitive UI for managing leads, agents, comments, and tags. It supports powerful filtering, drag-and-drop status changes, analytics reports, and seamless CRUD operations via API.

---

## 📁 Project Structure

```
src/
├── components/         # Reusable components (Navbar, Sidebar, layout etc.)
├── pages/              # Main screen components (Dashboard, Agents, Leads, Reports)
├── context/            # Global context (LeadContext, AgentContext)
├── App.jsx             # Main app structure
├── main.jsx            # Entry point
├── routes.jsx          # Page routing
```

---

## 📦 Key Dependencies (from package.json)

| Library               | Purpose                                             |
|----------------------|-----------------------------------------------------|
| `react`              | Core React library                                  |
| `react-router-dom`   | Routing between pages                               |
| `axios`              | Making HTTP API calls                               |
| `recharts`           | Visualizing data with charts (Pie, Bar)             |
| `react-beautiful-dnd`| Drag-and-drop functionality for lead status         |
| `tailwindcss`        | Styling the UI with utility-first CSS               |
| `clsx`               | Conditional class handling                          |

---

## 🎯 Features

### 📊 Dashboard

- Overview of CRM activity
- Quick navigation to reports, agents, leads

### 👨‍💼 Agent Management

- View all agents
- Add new agent
- Edit or delete existing agents

### 📋 Lead Management

- View all leads with filters (status, agent, priority)
- Add new lead
- Assign agent to a lead
- Edit or delete leads
- Add or remove comments on a lead
- **Drag and drop** to update lead status visually

### 💬 Comment System

- Each lead has its own threaded comment section
- Comments are linked to agents
- Agents can add/edit/delete their own comments

### 📈 Reports

- Pie chart showing leads closed vs pipeline
- Bar chart showing leads by agents
- Pie chart showing status distribution

---

## 🎨 UI Tech

- Fully responsive layout using **Tailwind CSS**
- Gradient backgrounds and soft shadows for a clean CRM design
- Dynamic dropdowns and form validations
- Component-driven structure with reusable UI elements

---

## 🔧 Setup Instructions

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/anvaya-crm-frontend.git
   cd anvaya-crm-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the app:**
   ```bash
   npm run dev
   ```

4. Make sure the backend is running and CORS is configured properly.

---

## 🌐 Connect with Backend

- All data (leads, agents, comments, tags) is fetched from the [Anvaya CRM Backend](https://github.com/your-username/anvaya-crm-backend)
- Use `axios` to make authenticated API calls


---

## 🙌 Contribution

We welcome contributions to improve the CRM! You can:
- Submit feature requests
- Fix UI/UX bugs
- Improve performance
- Add animations and accessibility improvements
