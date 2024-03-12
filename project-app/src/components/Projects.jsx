import React, { useState, useEffect } from 'react';

export default function Projects() {
 const [selectedDomain, setSelectedDomain] = useState('');
 const [projects, setProjects] = useState([
    {
      "projectId": 1,
      "domain": "Health Care",
      "description": "A mobile application designed to connect patients with healthcare professionals for online consultations.",
      "likes": 150,
      "comments": [
        {
          "userId": 1,
          "comment": "Great app! It's really helpful for scheduling appointments."
        },
        {
          "userId": 2,
          "comment": "I love the user interface. It's very intuitive."
        }
      ]
    },
    {
      "projectId": 2,
      "domain": "Education",
      "description": "An online platform that offers personalized learning experiences for students.",
      "likes": 200,
      "comments": [
        {
          "userId": 3,
          "comment": "The personalized learning path is very effective."
        },
        {
          "userId": 4,
          "comment": "I've learned a lot from this platform."
        }
      ]
    },
    {
      "projectId": 3,
      "domain": "AI",
      "description": "A machine learning model developed to predict stock market trends.",
      "likes": 100,
      "comments": [
        {
          "userId": 5,
          "comment": "The predictions are quite accurate."
        },
        {
          "userId": 6,
          "comment": "I'm impressed by the model's performance."
        }
      ]
    }
 ]);

 const filteredProjects = projects.filter(project => project.domain === selectedDomain);

 const handleLike = (projectId) => {
    setProjects(projects.map(project => 
      project.projectId === projectId ? {...project, likes: project.likes + 1} : project
    ));
 };

 const handleAddComment = (projectId, comment) => {
    setProjects(projects.map(project => 
      project.projectId === projectId ? {...project, comments: [...project.comments, {userId: project.comments.length + 1, comment}]} : project
    ));
 };

 return (
    <div className="container mt-4">
      <h2>Projects</h2>
      <select
        value={selectedDomain}
        onChange={(e) => setSelectedDomain(e.target.value)}
        className="form-control mb-3"
      >
        <option value="">Select a domain</option>
        {[...new Set(projects.map(project => project.domain))].map((domain, index) => (
          <option key={index} value={domain}>{domain}</option>
        ))}
      </select>
      <ul className="list-group">
        {filteredProjects.map((project, index) => (
          <li key={index} className="list-group-item">
            <h5>{project.description}</h5>
            <button className="btn btn-primary mb-2" onClick={() => handleLike(project.projectId)}>Like ({project.likes})</button>
            <h6>Comments:</h6>
            <ul>
              {project.comments.map((comment, commentIndex) => (
                <li key={commentIndex}>{comment.comment}</li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Add a comment"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                 handleAddComment(project.projectId, e.target.value);
                 e.target.value = ''; // Clear the input
                }
              }}
            />
          </li>
        ))}
      </ul>
    </div>
 );
}
