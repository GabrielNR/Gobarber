import uploadConfig from '@config/upload';
import { Router } from 'express';
import multer from 'multer';

import UserAvatarController from '@modules/Users/infra/controllers/UserAvatarController';
import UsersController from '@modules/Users/infra/controllers/UsersController';


import ensureAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';

const usersRouter = Router();
const usersController = new UsersController()
const usersAvatarController = new UserAvatarController()
const upload = multer(uploadConfig)

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', 
  ensureAuthenticated, 
  upload.single('avatar'), 
  usersAvatarController.update
);

export default usersRouter;