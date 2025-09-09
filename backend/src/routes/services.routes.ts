import { Router } from 'express';
import {   ServicesController } from '../controllers/services.controller';


const router = Router();
router.get('/', ServicesController.list);
router.get('/:id', ServicesController.get);
router.post('/', ServicesController.create);
router.put('/:id', ServicesController.update);
router.delete('/:id', ServicesController.remove);
export default router;