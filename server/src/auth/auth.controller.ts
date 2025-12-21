import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

type CookieOption ={
  httpOnly: boolean,
  secure: boolean,
  sameSite: 'lax' | 'none' | 'strict'
}

type CustomResponse= {
  cookie:(
    name:string,
    value:string,
    options:CookieOption
    ) => void,
   clearCookie:(name:string) => void
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async handleRegister(@Body() body: RegisterDto) {
    await this.authService.register(body);
    return { message: 'Account created successfully.' };
  }

  @Post('login')
  async handleLogin(@Body() body: LoginDto, @Res() res: CustomResponse) {
    const { accessToken } = await this.authService.login(body);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return { accessToken, message: 'Logged in successfully.' }
  }

  @Post('logout')
  handleLogout(@Res({ passthrough: true }) res: CustomResponse) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully.' }
  }
}
