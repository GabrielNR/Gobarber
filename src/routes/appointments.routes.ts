import { isEqual, parseISO, startOfHour } from 'date-fns';
import { Router } from 'express';
import { uuid } from 'uuidv4';

//Interfaces
interface Appointment {
	id: string
	provider: string
	date: Date
}

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

  //Criacao do objeto
  const appointment = {
    id: uuid(),
    provider,
    date: parseDate,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;