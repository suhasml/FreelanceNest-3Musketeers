const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  problemStatement: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  level: { type: String, required: true },
  duration: { type: String, required: true },
  money: { type: String, required: true },
  question : { type: String}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
