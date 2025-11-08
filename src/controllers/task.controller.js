import taskService from '../services/task.service.js';

class TaskController {

    // GET /api/tasks
    async getAllTasks(req, res) {
        try {
            const tasks = await taskService.getAllTasks();
            res.json({
                success: true,
                data: tasks
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching tasks',
                error: error.message
            });
        }
    }

    // GET /api/tasks/:id
    async getTaskById(req, res) {
        try {
            const task = await taskService.getTaskById(req.params.id);
            
            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                });
            }
            
            res.json({
                success: true,
                data: task
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching task',
                error: error.message
            });
        }
    }

    // POST /api/tasks
    async createTask(req, res) {
        try {
            const { title, description, status } = req.body;
            
            // Validación básica
            if (!title) {
                return res.status(400).json({
                    success: false,
                    message: 'Title is required'
                });
            }
            
            const newTask = await taskService.createTask({ title, description, status });
            
            res.status(201).json({
                success: true,
                data: newTask
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating task',
                error: error.message
            });
        }
    }

    // PUT /api/tasks/:id
    async updateTask(req, res) {
        try {
            const { title, description, status } = req.body;
            
            // Validación básica
            if (!title) {
                return res.status(400).json({
                    success: false,
                    message: 'Title is required'
                });
            }
            
            const updatedTask = await taskService.updateTask(req.params.id, { title, description, status });
            
            if (!updatedTask) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                });
            }
            
            res.json({
                success: true,
                data: updatedTask
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating task',
                error: error.message
            });
        }
    }

    // DELETE /api/tasks/:id
    async deleteTask(req, res) {
        try {
            const task = await taskService.getTaskById(req.params.id);
            
            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                });
            }

            await taskService.deleteTask(req.params.id);
            
            res.json({
                success: true,
                message: 'Task deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting task',
                error: error.message
            });
        }
    }
}

export default new TaskController();