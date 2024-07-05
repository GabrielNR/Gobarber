import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensuredAuthenticated';
import CreateUserService from '../services/CreateUserService';
import UpdatedUserAvatarService from '../services/UpdatedUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();
		//criar um service

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
    const updateUserAvatar = new UpdatedUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    })

    delete user.password

    return response.json(user)
});

export default usersRouter;