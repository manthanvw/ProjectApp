import React, { useState, useEffect } from "react";
import DomainForm from "./DomainForm"; // Create DomainForm component
import ProjectForm from "./ProjectForm"; // Create ProjectForm component

export default function Admin() {
  // State for domains and projects
  const [domains, setDomains] = useState([]);
  const [projects, setProjects] = useState([]);

  // State to control the visibility of the forms
  const [showDomainForm, setShowDomainForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  // Load initial domains and projects from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch domains
        const domainsData = await fetch(
          "http://localhost:8000/api/v1/getDomains"
        );
        const domains = (await domainsData.json()).data;
        setDomains(domains);
        // console.log(domains);

        // Fetch projects
        const projectsData = await fetch(
          "http://localhost:8000/api/v1/getProjects"
        );
        const projects = (await projectsData.json()).data;
        setProjects(projects);
        // console.log(projects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to add a new domain
  const addDomain = (newDomain) => {
    setDomains([...domains, newDomain]);
    setShowDomainForm(false); // Hide the form after adding
  };

  // Function to add a new project
  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
    setShowProjectForm(false); // Hide the form after adding
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Panel</h2>

      {/* Domain Form */}
      <DomainForm
        showForm={showDomainForm}
        onToggleForm={() => setShowDomainForm(!showDomainForm)}
      />

      {/* Project Form */}
      <ProjectForm
        showForm={showProjectForm}
        domains={domains}
        onToggleForm={() => setShowProjectForm(!showProjectForm)}
        onAddProject={addProject}
      />

      {/* Display Domains */}
      <h3>Domains</h3>
      <select
        className="form-control"
        onChange={(e) => {
          // Handle the selected domain (e.g., set it in state)
          console.log("Selected Domain:", e.target.value);
        }}
      >
        <option value="">Select a domain</option>
        {domains && domains.map((domain, index) => (
          <option key={index} value={domain._id}>
            {domain.name}: {domain.description}
          </option>
        ))}
      </select>

      {/* Display Projects */}
      <h3 className="mt-4">Projects</h3>
      <ul className="list-group">
        {projects && projects.map((project, index) => (
          <li key={index} className="list-group-item">
            {project.name}: {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
