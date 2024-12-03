import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TaskDashboard from "@/pages/TaskDashboard";
import TaskDetailPage from "@/pages/TaskDetailPage";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Task Management Dashboard</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<TaskDashboard />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
