import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './user.routes';

const routes = Router();

//repassar qualquer http get/post/ por isso o use
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;