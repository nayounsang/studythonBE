import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { GithubService } from './github.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    configService: ConfigService,
    private githubService: GithubService,
    private usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['public_profile'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<string> {
    if (!profile) {
      throw new HttpException(
        '깃허브정보를 가져오지 못했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const id = this.githubService.makeUserIdFromGithub(
      profile.id,
      profile.provider,
    );
    const user = await this.usersService.findAndCreateUser(id, {
      name: profile.username,
      avatarURL: profile.photos ? profile.photos[0].value : '',
    });
    if (!user) {
      throw new HttpException(
        '가입에 실패했습니다.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return id;
  }
}
