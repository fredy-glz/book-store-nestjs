import { Repository, EntityRepository, getConnection } from 'typeorm';
import { User } from '../user/user.entity';
import { SignupDto } from './dto/signup.dto';
import { RoleRepository } from '../role/role.repository';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';
import { UserDetails } from '../user/user.details.entity';
import { genSalt, hash } from 'bcryptjs';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {     
    async signup(signupDto: SignupDto) {
        // General
        const { username, email, password } = signupDto;
        const user = new User();
        user.username = username;
        user.email = email;

        // Role
        const roleRepository: RoleRepository = await getConnection().getRepository(
            Role,
        );
        const defaultRole: Role = await roleRepository.findOne({
            where: { name: RoleType.GENERAL },
        });
        user.roles = [defaultRole];

        // Details
        const details = new UserDetails();
        user.details = details;

        // Password
        const salt = await genSalt(10);
        user.password = await hash(password, salt);
        
        await user.save();
    }
}