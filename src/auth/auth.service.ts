import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Encryptor } from './encyrption/encyrpt-data';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

const encrypt = new Encryptor;

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {

        const user = await this.usersService.findOneWithEmail(email);
        if (user && (await encrypt.isPasswordCorrect(password, user.password))) {
            const { password: upass, ...result } = user;
            return result;
        }
        return null;
    }

    async login(userInfo: User, res: any) {
        const { password: upass, ...user } = userInfo;
        const payload = {
            id: user.id
        }
        return res.status(200).json({
            user: user,
            accessToken: this.jwtService.sign(payload),
        })
    }

    async createUser(userDto: CreateUserDto, res: any) {
        const checkEmail = await this.usersService.findOneWithEmail(userDto.email);
        if (checkEmail) return res.status(400).json({ message: 'Bu email adresi kullanılmaktadır.' });
        userDto.password = await encrypt.hashPassword(userDto.password);
        const user = await this.usersService.create(userDto);
        await this.login(user, res);
    }

}

//hdi bırk 
