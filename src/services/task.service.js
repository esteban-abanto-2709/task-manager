import db from '../config/database.js';

class TaskService {
    
    // Obtener todas las tareas
    async getAllTasks() {
        const [rows] = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
        return rows;
    }

    // Obtener una tarea por ID
    async getTaskById(id) {
        const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
        return rows[0];
    }

    // Crear nueva tarea
    async createTask(taskData) {
        const { title, description, status = 'pending' } = taskData;
        
        const [result] = await db.query(
            'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
            [title, description, status]
        );
        
        return this.getTaskById(result.insertId);
    }

    // Actualizar tarea
    async updateTask(id, taskData) {
        const { title, description, status } = taskData;
        
        await db.query(
            'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
            [title, description, status, id]
        );
        
        return this.getTaskById(id);
    }

    // Eliminar tarea
    async deleteTask(id) {
        await db.query('DELETE FROM tasks WHERE id = ?', [id]);
        return { message: 'Task deleted successfully' };
    }
}

export default new TaskService();