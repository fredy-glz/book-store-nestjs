import { Module } from '@nestjs/common';
import { Configuration } from './config/config.keys';

import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';

import { ConfigService } from './config/config.service';

import { UserController } from './modules/user/user.controller';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [
    ConfigModule, 
    DatabaseModule, 
    UserModule, 
    RoleModule, AuthModule, BookModule
  ],
  controllers: [UserController]
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT)
  }
}
