
import { container } from 'tsyringe';

import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentRepository from '@modules/Appointments/repositories/IAppointmentRepository';

import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/Users/repositories/IUsersRepository';


container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository', 
  AppointmentsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository', 
  UsersRepository
)