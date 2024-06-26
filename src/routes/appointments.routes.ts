import { isEqual, parseISO, startOfHour } from 'date-fns';
import { Router } from 'express';
import Appointment from '../models/Appointment'; //importando o model

const appointmentsRouter = Router();

//Banco de dados 
const appointments: Appointment[] = [];


appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  
  const parseDate = startOfHour(parseISO(date));

  //ha agendamento no mesmo horario?
  //isequal verifica se as datas sao iguais
	const findAppointentInSameDate = appointments.find(appointment =>
    isEqual(parseDate, appointment.date),
  );

  //se tiver agendamento mesmo horario da um erro
  if (findAppointentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appontment is already booked' });
  }

  const appointment = new Appointment(provider, parseDate);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;