import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepositoy = getRepository(User);

    const checkUserExists = await usersRepositoy.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepositoy.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepositoy.save(user);

    return user;
  }
}

export default CreateUserService;