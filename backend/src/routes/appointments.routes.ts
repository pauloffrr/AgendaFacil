import { Router } from 'express';
import { AppointmentsController } from '../controllers/appointments.cotroller';


const router = Router();
router.get('/', AppointmentsController.list);
router.get('/:id', AppointmentsController.get);
router.post('/', AppointmentsController.create);
router.put('/:id', AppointmentsController.update);
router.delete('/:id', AppointmentsController.remove);
export default router;