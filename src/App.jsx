import { useEffect, useState } from "react";
import ProjectDashboard from "./elements/ProjectDashboard";
import Home from "./Home";
import axiosDefault from "./api/axiosDefault";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosDefault.get("/projects/");
        const projects = response.data;
        setProjects(projects);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        <h1>CBRE Smart Building Certification Dashboard</h1>
      </div>
      <Routes>
        {/* Startseite */}
        <Route path="/" element={<Home projects={projects} />} />

        {/* Parameterisierte Route für Dashboard */}
        <Route path="/dashboard/:projectId" element={<ProjectDashboard />} />

        {/* Optional: 404-Seite */}
        <Route path="*" element={<div>404 - Seite nicht gefunden</div>} />
      </Routes>
    </>
  );
}
