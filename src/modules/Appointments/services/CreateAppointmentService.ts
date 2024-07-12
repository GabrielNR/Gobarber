import { startOfHour } from 'date-fns';

import Appointment from '@modules/Appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentRepository';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository){}
  
  public async execute({date, provider_id}: RequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = this.appointmentsRepository.create({
      provider_id, 
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService