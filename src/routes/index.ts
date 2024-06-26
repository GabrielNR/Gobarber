import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

//repassar qualquer http get/post/ por isso o use
routes.use('/appointments', appointmentsRouter);

export default routes;