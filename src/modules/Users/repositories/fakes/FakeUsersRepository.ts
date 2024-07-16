
import ICreateUserDTO from "@modules/Users/dtos/ICreateUserDTO";
import IUsersRepository from "@modules/Users/repositories/IUsersRepository";

import User from "@modules/Users/infra/typeorm/entities/User";
import { uuid } from "uuidv4";

class UsersRepository implements IUsersRepository {
  private users: User[] = [];
  
  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);


    return findUser
  }
  
  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid() } ,
      userData
    )

    this.users.push(user)

    return user
  }

  public async save(user: User): Promise<User> {
    //procurar se o usuario esta no array
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

    //atualizando no array
    this.users[findIndex] = user;

    return user
  }
}

export default UsersRepository