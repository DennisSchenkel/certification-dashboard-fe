import { Link } from "react-router-dom";

function Home({ projects }) {
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

export default Home;
