import express from 'express';
import servicesRoutes from './routes/services.routes';


const app = express();
app.use(express.json());
app.use('/api/services', servicesRoutes);


app.get('/', (_req, res) => res.json({ ok: true, message: 'CRUD Serviços (mock)' }));


export default app;