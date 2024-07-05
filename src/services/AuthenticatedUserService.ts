import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import { getRepository } from "typeorm";

import authConfig from "../config/auth";
import AppError from '../errors/AppError';
import User from "../models/User";


interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}


class AuthenticatedUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepositoy = getRepository(User)

    const user = await usersRepositoy.findOne({
      where: { email }
    });

    if(!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // user.password - Senha criptografada
    // password - senha não criptografada
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt
    
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    });
    
    return {
      user,
      token,
    };
  }
}

export default AuthenticatedUserService