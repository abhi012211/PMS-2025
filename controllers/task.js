import task from '../models/task.js';

export const createTask = async (req, res,next) => {
  try {
    const { title, description,status,assignedTo,projectId } = req.body;
    const {companyId} = req.user;

    const newTask = new task({ title, description,status,assignedTo,projectId,companyId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const listTasks = async (req, res,next) => {
    try {
      const { companyId,role,_id:userId } = req.user;
      const {page=1,limit=10,status,assignedTo} = req.query;
        const query = { companyId };
        if(role==='member'){
          query.assignedTo = userId;
        }
        if(status){
          query.status = status;
        }
        if(assignedTo){
          query.assignedTo = assignedTo;
        }
      const tasks = await task.find({ query }).skip((page - 1) * limit).limit(limit).populate('assignedTo').populate('projectId');
        const totalTasks = await task.countDocuments(query);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }       
}
export const updateTask = async (req, res,next) => {
    try {
        const { id } = req.params;
        const {role,_id:userId,companyId} = req.user;
        const updateData = req.body;
        const query={_id:userId,companyId};
        if(role==='member'){
          query.assignedTo = userId;
        }
        const taskToUpdate = await task.findOneAndUpdate({ query,updateData }, { new: true });
        if (!taskToUpdate) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(taskToUpdate);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const deleteTask = async (req, res,next) => {
    try {
        const { id } = req.params;
        const {role,_id:userId,companyId} = req.user;
        const query={_id:userId,companyId};
        // if(role==='member'){
        //   query.assignedTo = userId;
        // }
        const taskToDelete = await task.findOneAndDelete({ query });
        if (!taskToDelete) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}