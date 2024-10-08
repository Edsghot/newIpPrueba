import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
      ) {}
    
      async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.validateUser(username, pass);
        if (user) {
          return user;
        }
        return null;
      }
    
      async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
