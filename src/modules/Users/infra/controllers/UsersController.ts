import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/Users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response>{
    //recebendo dados
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);
  
    const user = await createUser.execute({
      name,
      email,
      password,
    });
  
    delete user.password;
    
    return response.json(user);
  }
}