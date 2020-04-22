import { Module } from '@nestjs/common';
import { SlackBotModule } from '../../src';
import { HelloInterceptor } from './hello.interceptor';

@Module({
  imports: [SlackBotModule.forRoot({ slackToken: '' })],
  providers: [HelloInterceptor],
})
export class AppModule {}
