import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async handleRegister(@Body() body: RegisterDto) {
    await this.authService.register(body);
    return { message: 'Account created successfully.' };
  }

  @Post('login')
  async handleLogin(@Body() body: LoginDto, @Res() res: Response) {
    const { accessToken } = await this.authService.login(body);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.json({ accessToken, message: 'Logged in successfully.' });
  }
}
