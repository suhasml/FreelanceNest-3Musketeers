const express = require('express');
const router = express.Router();
const Developer = require('../models/developer');
const ProjectDeveloper = require('../models/projectDeveloper');

// Route to add developer
router.post('/developers', async (req, res) => {
  try {
    const { email } = req.body;
    const existingDeveloper = await Developer.findOne({ email });
    if (!existingDeveloper) {
      const newDeveloper = new Developer({ email });
      await newDeveloper.save();
      res.status(201).json(newDeveloper);
    } else {
      res.json(existingDeveloper);
    }
  } catch (error) {
    console.error('Error adding developer:', error);
    res.status(400).json({ message: error.message });
  }
});

// Route to update developer profile
router.put('/developers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, linkedin, github, techStack } = req.body;
    const developer = await Developer.findById(id);
    if (developer) {
      developer.firstName = firstName;
      developer.lastName = lastName;
      developer.linkedin = linkedin;
      developer.github = github;
      developer.techStack = techStack;
      await developer.save();
      res.status(200).json(developer);
    } else {
      res.status(404).json({ message: 'Developer not found' });
    }
  } catch (error) {
    console.error('Error updating developer:', error);
    res.status(400).json({ message: error.message });
  }
});

// Route to add developer to project
router.post('/projects/developers', async (req, res) => {
  try {
    const { developerEmail, projectId } = req.body;
    const projectDeveloper = new ProjectDeveloper({ developerEmail, projectId });
    await projectDeveloper.save();
    res.status(201).json(projectDeveloper);
  } catch (error) {
    console.error('Error adding developer to project:', error);
    res.status(400).json({ message: error.message });
  }
});

// Route to retrieve projects involved by developer
router.get('/developers/:email/projects', async (req, res) => {
  try {
    const { email } = req.params;
    const projects = await ProjectDeveloper.find({ developerEmail: email }).populate('projectId');
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error retrieving projects involved by developer:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
