//Imports
import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

//Interfaces
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

//Classe
class AppointmentsRepository {
  private appointments: Appointment[];

	 constructor() {
    this.appointments = [];
  }
  
  //Métodos
  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    
		const appointment = new Appointment({
      provider,
      date
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;