import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/Appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response>{
    //recebendo dados
    const { provider_id, date } = request.body;
  
    const parseDate = parseISO(date);
  
    //tratando dado no service
    const createAppointment = container.resolve(CreateAppointmentService);
  
    //criando appointment
    const appointment = await createAppointment.execute({
      date: parseDate,
      provider_id,
    });
  
    return response.json(appointment);
  }
}