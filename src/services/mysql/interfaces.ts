import { AuthModule } from './auth';
import { EndpointsModule } from './endpoints';
import { ResultModule } from './results';
import { UsersModule } from './users';

export interface Db {
  resultModule: ResultModule;
  endpointModule: EndpointsModule;
  usersModule: UsersModule;
  authModule: AuthModule;
}
