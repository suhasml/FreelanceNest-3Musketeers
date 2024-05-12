import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useAuth } from '../../contexts/authContext';

const DevHome = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // State to track selected project
  const { currentUser } = useAuth();

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

  // Function to handle card click and set selected project
  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedProject(null);
  };

  const handleApply = async () => {
    try {
      if (selectedProject) {
        const email = currentUser.email;
        await axios.post(`http://localhost:3000/freelancer/projects/${selectedProject._id}/add-email`, { email });
        console.log('Email added to project:', selectedProject._id);
        // Add any further action after successfully adding the email
      }
    } catch (error) {
      console.error('Error adding email to project:', error);
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
              className={`bg-white shadow-md p-4`}
            >
              <div onClick={() => handleCardClick(project)}>
                <h2 className="text-xl font-semibold">{project.projectName}</h2>
                <p className="text-600">Description: {project.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Modal for displaying project details */}
        {selectedProject && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg font-medium text-gray-900">{selectedProject.projectName}</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Description: {selectedProject.description}</p>
                        <p className="text-sm text-gray-500">Skills Required: {selectedProject.technologies.join(', ')}</p>
                        <p className="text-sm text-gray-500">Budget: ${selectedProject.money}</p>
                        <p className="text-sm text-gray-500">Duration: {selectedProject.duration} Hrs</p>
                        <p className="text-sm text-gray-500">Assessment Question: {selectedProject.question}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button onClick={ handleApply} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Apply
                    </button>
                  <button onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default DevHome;
