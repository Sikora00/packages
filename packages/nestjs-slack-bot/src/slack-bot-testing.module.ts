import { Module } from '@nestjs/common';
import { Bot } from './bot';
import { HelpSlackCommand } from './commands/help.slack-command';
import { InterceptorsConsumer } from './interceptors.consumer';
import { SlackTestingService } from './slack-testing.service';
import { SlackService } from './slack.service';

@Module({
  providers: [
    Bot,
    HelpSlackCommand,
    InterceptorsConsumer,
    {
      provide: SlackService,
      useClass: SlackTestingService,
    },
  ],
  exports: [SlackService],
})
export class SlackBotTestingModule {}
