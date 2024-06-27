import { parseISO, startOfHour } from 'date-fns';
import { Router } from 'express';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  
  const parseDate = startOfHour(parseISO(date));

  const findAppointentInSameDate = appointmentsRepository.findByDate(parseDate);

  //se tiver agendamento mesmo horario da um erro
  if (findAppointentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appontment is already booked' });
  }

  const appointment = appointmentsRepository.create({
    provider, 
    date: parseDate
  });

  return response.json(appointment);
});

export default appointmentsRouter;