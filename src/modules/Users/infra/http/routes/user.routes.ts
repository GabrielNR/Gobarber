import uploadConfig from '@config/upload';
import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/Users/services/CreateUserService';
import UpdatedUserAvatarService from '@modules/Users/services/UpdatedUserAvatarService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const usersRouter = Router();
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const usersRepository = new UsersRepository()

    const createUser = new CreateUserService(usersRepository)

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
});

usersRouter.patch('/avatar', 
  ensureAuthenticated, 
  upload.single('avatar'), 
  async (request, response) => {
    const usersRepository = new UsersRepository()

    const updateUserAvatar = new UpdatedUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    })

    delete user.password

    return response.json(user)
});

export default usersRouter;