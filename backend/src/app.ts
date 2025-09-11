import express from 'express';
import sequelize from './config/config'
import servicesRoutes from './routes/services.routes';
import appointmentsRoutes from './routes/appointments.routes';
import SchedulingRoutes from './routes/SchedulingRoutes';

const app = express();
app.use(express.json());
app.use('/api/services', servicesRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/scheduling', SchedulingRoutes)


app.get('/', (_req, res) => res.json({ ok: true, message: 'CRUD Serviços (mock)' }));

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log("Banco sincronizado");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch(err => console.error("Erro ao sincronizar banco:", err));

export default app;