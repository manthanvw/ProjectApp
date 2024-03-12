// ProjectForm.jsx
import React, { useState } from 'react';

const ProjectForm = ({ domains, onAddProject }) => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const handleProjectSubmit = async () => {
    if (selectedDomain.trim() !== '' && newProjectTitle.trim() !== '' && newProjectDescription.trim() !== '') {
      try {
        const response = await fetch('http://localhost:8000/api/v1/addProject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newProjectTitle,
            description: newProjectDescription,
            domain: selectedDomain,
          }),
        });

        if (response.ok) {
          // Successfully added project, you may want to handle this accordingly
          console.log('Project added successfully');
          onAddProject({
            title: newProjectTitle,
            description: newProjectDescription,
            domain: selectedDomain,
          }); // Update the UI with the new project
          // Reset form fields
          setSelectedDomain('');
          setNewProjectTitle('');
          setNewProjectDescription('');
        } else {
          // Handle error, for example:
          console.error('Error adding project:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding project:', error.message);
      }
    }
  };

  return (
    <div className="mb-4">
      <select
        value={selectedDomain}
        onChange={(e) => setSelectedDomain(e.target.value)}
        className="form-control mb-2"
      >
        <option value="">Select a domain</option>
        {domains.map((domain) => (
          <option key={domain._id} value={domain._id}>
            {domain.name}: {domain.description}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={newProjectTitle}
        onChange={(e) => setNewProjectTitle(e.target.value)}
        className="form-control mb-2"
        placeholder="Enter project title"
      />
      <input
        type="text"
        value={newProjectDescription}
        onChange={(e) => setNewProjectDescription(e.target.value)}
        className="form-control mb-2"
        placeholder="Enter project description"
      />
      <button className="btn btn-success" onClick={handleProjectSubmit}>
        Submit Project
      </button>
    </div>
  );
};

export default ProjectForm;
