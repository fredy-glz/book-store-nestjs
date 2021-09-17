import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from "./user.repository";
import { UserService } from './user.service';
import { SharedModule } from '../../shared/shared.module';
import { UserController } from './user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]), 
        SharedModule],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController]
})
export class UserModule {}