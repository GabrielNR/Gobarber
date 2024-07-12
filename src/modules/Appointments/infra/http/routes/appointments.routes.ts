import { parseISO } from 'date-fns';
import { Router } from 'express';

import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/Appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository)
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
});

export default appointmentsRouter;