//Imports
import ICreateAppointmentDTO from '@modules/Appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/Appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentRepository';
import { getRepository, Repository } from 'typeorm';

//Classe
class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor(){
    this.ormRepository = getRepository(Appointment)
  }
  
  //Método
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date }
    })

    return findAppointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      date
    })

    await this.ormRepository.save(appointment);

    return appointment
  }
}

export default AppointmentsRepository;