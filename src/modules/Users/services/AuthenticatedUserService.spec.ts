// import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticatedUserService from './AuthenticatedUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUserService', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider 
    )

    const authenticateUser = new AuthenticatedUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const user  = await createUser.execute({
      name: 'Joe Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })
})
