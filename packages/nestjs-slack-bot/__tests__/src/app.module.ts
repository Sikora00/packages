import { Module } from '@nestjs/common';
import { SlackBotModule } from '../../src';

@Module({
  imports: [SlackBotModule.forRoot({ slackToken: '' })],
})
export class AppModule {}
