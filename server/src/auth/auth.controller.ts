import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async handleRegister(@Body() body: RegisterDto) {
    await this.authService.register(body);
    return { message: 'Account created successfully.' };
  }

  @Post('login')
  async handleLogin(@Body() body: LoginDto) {
    const { accessToken } = await this.authService.login(body);
    return { accessToken, message: 'Logged in successfully.' };
  }
}
