import { container } from 'tsyringe';

import BCryptHashProvider from './HashProvider/implementations/BCriptHashProvider';
import IHashProvider from './HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>(
  'HashProvider', 
  BCryptHashProvider
)