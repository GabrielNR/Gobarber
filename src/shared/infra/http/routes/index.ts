import { Router } from 'express';

import appointmentsRouter from '@modules/Appointments/infra/http/routes/appointments.routes';
import sessionsRouter from '@modules/Users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/Users/infra/http/routes/user.routes';

const routes = Router();

//repassar qualquer http get/post/ por isso o use
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;