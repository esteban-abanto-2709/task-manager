import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import taskRoutes from './routes/task.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// === MIDDLEWARES ===

// Seguridad básica
app.use(helmet());

// CORS (permite peticiones desde otros orígenes)
app.use(cors());

// Rate limiting (máximo 100 peticiones por 15 minutos)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later'
});
app.use(limiter);

// Parser de JSON
app.use(express.json());

// === RUTAS ===

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        message: 'Task Manager API',
        version: '1.0.0',
        endpoints: {
            tasks: '/api/tasks'
        }
    });
});

// Rutas de tareas
app.use('/api/tasks', taskRoutes);

// Ruta 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// === INICIAR SERVIDOR ===
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});