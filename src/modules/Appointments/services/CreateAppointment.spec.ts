import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from "./CreateAppointmentService";

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456789'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789')
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2024, 7, 17, 17);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456789'
    });

    expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456789'
    })).rejects.toBeInstanceOf(AppError)
  })
});
