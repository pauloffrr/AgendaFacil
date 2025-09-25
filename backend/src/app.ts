import express from 'express';
import sequelize from './config/config';
import LoginRoutes from './routes/LoginRoutes';
import SchedulingRoutes from './routes/SchedulingRoutes';
import UserRoutes from './routes/UserRoutes';
import CompanyRoutes from './routes/CompanyRoutes';

const app = express();
app.use(express.json());

app.use('/api/login', LoginRoutes)
app.use('/api/scheduling', SchedulingRoutes)
app.use('/api/user', UserRoutes)
app.use('/api/company', CompanyRoutes)


app.get('/', (_req, res) => res.json({ ok: true, message: 'CRUD Serviços (mock)' }));

sequelize.sync() 
  .then(() => {
    console.log("Banco sincronizado");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch(err => console.error("Erro ao sincronizar banco:", err));

export default app;