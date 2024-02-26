import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubService {
  makeUserIdFromGithub(id: string, provider = 'github'): string {
    return `${provider}${id}`;
  }
}
