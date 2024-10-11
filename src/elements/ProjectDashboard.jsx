import { useEffect, useState } from "react"
import axiosDefault from "../api/axiosDefault"
import Sections from "./Sections"
import { Link, useParams } from "react-router-dom";

export default function ProjectDashboard() {

    const { projectId } = useParams();

    const [error, setError] = useState(null);
    const [sections, setSections] = useState([]);
    const [project, setProject] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosDefault.get("/sections/");
                const sections = response.data;
                setSections(sections);
            } catch (error) {
                setError(error);
            }
            try {
                const response = await axiosDefault.get(`/projects/${projectId}/`);
                const project = response.data;
                setProject(project);
            }
            catch (error) {
                setError(error);
            }
        }
        fetchData();
    }
    , [ projectId ]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <h2><i>{project.name}</i></h2>
            <Link to="/">Projekt Übersicht</Link>
            {      
                sections.map((section) => (
                    <div key={section.id} className="mt-4 mb-5">
                        <Sections section={section} projectId={projectId} />
                    </div>
                ))
            }
        </>
    )
}