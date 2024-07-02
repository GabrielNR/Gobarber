//Imports
import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

//Classe
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  //Método
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    })

    return findAppointment || null;
  }
}

export default AppointmentsRepository;