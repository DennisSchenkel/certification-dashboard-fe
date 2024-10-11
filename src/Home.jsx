import { Link } from "react-router-dom";

export default function Home({ projects }) {
  return (
    <div>
      <h2>Wählen Sie ein Projekt</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/dashboard/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
