import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

const DeveloperHomePage = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [expandedProjectId, setExpandedProjectId] = useState(null); // State to track expanded project

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/PM/allprojects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.message);
      }
    };

    fetchProjects();
  }, []);

  // Function to handle card click and expand/collapse
  const handleCardClick = (projectId) => {
    if (expandedProjectId === projectId) {
      setExpandedProjectId(null); // Collapse if already expanded
    } else {
      setExpandedProjectId(projectId); // Expand if not expanded
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto p-4">
        <h1 className='bg-blue py-3 px-4 mx-3 text-center'>Explore Projects</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="grid grid-cols-3 gap-4">
          {projects.map(project => (
            <div 
              key={project._id} 
              className={`bg-white shadow-md p-4 ${expandedProjectId === project._id ? 'h-auto' : 'h-36'} overflow-hidden`}
              onClick={() => handleCardClick(project._id)}
            >
              <h2 className="text-xl font-semibold">{project.projectName}</h2>
              <p className="text-600 p-4">Description: {project.description}</p>
              {expandedProjectId === project._id && (
                <>
                  <p className="text-600 p-4">Skills Required: {project.technologies.join(', ')}</p>
                  <p className="text-600 p-4">Budget: ${project.money}</p>
                  <p className="text-600 p-4">Duration: {project.duration} Hrs</p>
                  <p className="text-600 p-4">Assessment Question: {project.question}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperHomePage;

