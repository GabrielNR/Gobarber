import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

import authConfig from "@config/auth";
import User from "@modules/Users/infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError';
import IUsersRepository from "../repositories/IUsersRepository";


interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}


class AuthenticatedUserService {
  constructor(private usersRepository: IUsersRepository){}

  public async execute({ email, password }: Request): Promise<Response> {

    const user = await this.usersRepository.findByEmail(email);

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