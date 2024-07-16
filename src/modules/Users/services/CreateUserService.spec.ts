import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AuthenticatedUserService from './AuthenticatedUserService'
import CreateUserService from './CreateUserService'


describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
  
  const fakeUsersRepository = new FakeUsersRepository()
  const fakeHashProvider = new FakeHashProvider()

  const CreateUser = new CreateUserService(
    fakeUsersRepository,
      fakeHashProvider
    )

  const user = await CreateUser.execute({
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '123456',
  })

    expect(user).toHaveProperty('id')
  })

  it('should be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const CreateUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    await CreateUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(
      CreateUser.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticatedUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    expect(authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
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

    await createUser.execute({
      name: 'Joe Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })


    expect(authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: 'wrong-passoword',
    })).rejects.toBeInstanceOf(AppError)

  })
})