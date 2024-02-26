import { Module } from '@nestjs/common';
import { OnlySelfStrategy } from './only-self.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [OnlySelfStrategy],
})
export class OnlySelfModule {}
