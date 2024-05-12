// Frontend - React

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

const DeveloperHomePage = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/projects/{userEmail}`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.message); // Update error state
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto p-4">
        <h1 className='bg-blue py-3 px-4 mx-3 text-center'>Explore Projects</h1>
        {error && <div className="error-message">{error}</div>} {/* Display error message if error exists */}
        <div className="grid grid-cols-3 gap-4">
          {projects.map(project => (
            <div key={project._id} className="bg-white shadow-md p-4">
              <h2 className="text-xl font-semibold">{project.projectName}</h2>
              <p>{project.description}</p>
              {/* Add more project details as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperHomePage;
