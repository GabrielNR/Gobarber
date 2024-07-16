import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakesStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdatedUserAvatarService from './UpdatedUserAvatarService';


describe('UpdateUserAvatar', () => {
  it('should be able to create a new user', async () => {
  
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const updatedUserAvatar = new UpdatedUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

      await updatedUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    })

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('should be able to update avatar from non existing user', async () => {
    
      const fakeUsersRepository = new FakeUsersRepository()
      const fakeStorageProvider = new FakeStorageProvider()

      const updatedUserAvatar = new UpdatedUserAvatarService(
        fakeUsersRepository,
        fakeStorageProvider
      )

      expect( updatedUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.jpg'
      })).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when updating new one', async () => {
    
      const fakeUsersRepository = new FakeUsersRepository()
      const fakeStorageProvider = new FakeStorageProvider()

      //observar qualquer funcao dentro do codigo "spyOn"
      const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

      const updatedUserAvatar = new UpdatedUserAvatarService(
        fakeUsersRepository,
        fakeStorageProvider
      )

      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      })

        await updatedUserAvatar.execute({
        user_id: user.id,
        avatarFileName: 'avatar.jpg'
      })

      await updatedUserAvatar.execute({
        user_id: user.id,
        avatarFileName: 'avatar2.jpg'
      })

      expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

      expect(user.avatar).toBe('avatar2.jpg')
  })
})