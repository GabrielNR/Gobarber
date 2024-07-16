import { isEqual } from 'date-fns';
import { uuid } from 'uuidv4';

import ICreateAppointmentDTO from "@modules/Appointments/dtos/ICreateAppointmentDTO";
import Appointment from "@modules/Appointments/infra/typeorm/entities/Appointment";
import IAppointmentRepository from "../IAppointmentRepository";


class FakeAppointmentsRepository implements IAppointmentRepository{
  private appointments: Appointment[] = []
  
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async create({date, provider_id}: ICreateAppointmentDTO): Promise<Appointment> {
     //criação de agendamento
     const appointment = new Appointment();

     Object.assign(appointment, 
     { id: uuid(), date, provider_id })
 
     this.appointments.push(appointment)
 
     return appointment
  }
}

export default FakeAppointmentsRepository