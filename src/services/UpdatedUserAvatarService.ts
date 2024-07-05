import fs from "fs";
import path from 'path';
import { getRepository } from "typeorm";

import uploadConfig from "../config/upload";
import AppError from '../errors/AppError';
import User from "../models/User";

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName}: Request) {
    const usersRepositoy = getRepository(User);

    const user = await usersRepositoy.findOne(user_id);

    if(!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }

    if(user.avatar) {
      //Deletar avatar anterior

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName;

    await usersRepositoy.save(user);

    return user;
  }
}

export default UpdateUserAvatarService