import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticatedUserService from '@modules/Users/services/AuthenticatedUserService';


class SessionsController {
  public async create(request: Request, response: Response): Promise<Response>{
    //recebendo dados 
    const { email, password } = request.body;

    //tratando o dado
    const authenticateUser = container.resolve(AuthenticatedUserService);

    
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token});
  }
}

export { SessionsController };
