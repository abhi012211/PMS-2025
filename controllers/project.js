import Project from "../models/project.js";

export const createProject = async (req, res, next) => {
  const { name, description, startDate, endDate } = req.body;
  const { _id: userId, companyId } = req.user;
  try {
    const project = new Project({
      name,
      description,
      startDate,
      endDate,
      createdBy: userId,
      companyId,
    });
    await project.save();
    res.status(201).json({
      message: "Project created successfully",
      projectId: project._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const listProjects = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const { companyId } = req.user;
  try {
    const projects = await Project.find({ companyId })
      .populate("createdBy", "name email")
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Project.countDocuments({ companyId });
    res.status(200).json({
      projects,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
 export const updateProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { name, description, startDate, endDate } = req.body;
    const { companyId } = req.user;
  try {
    const project = await Project.findByIdAndUpdate(
      {projectId, companyId},
      { name, description, startDate, endDate },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export const deleteProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { companyId } = req.user;
  try {
    const project = await Project.findByIdAndDelete({projectId, companyId});
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};