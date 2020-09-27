import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { Bot } from './bot';
import { HelpSlackCommand } from './commands/help.slack-command';
import { InterceptorsConsumer } from './interceptors.consumer';
import { SlackBotModuleOptions } from './interfaces/slack-bot-module-options.interface';
import { SlackTestingService } from './slack-testing.service';
import { SlackService } from './slack.service';

const SLACK_TOKEN = Symbol('SLACK_TOKEN');

@Module({})
export class SlackBotTestingModule implements OnModuleInit {
  static forRoot(options: SlackBotModuleOptions): DynamicModule {
    return {
      module: SlackBotTestingModule,
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
    };
  }

  constructor(private bot: Bot) {}

  onModuleInit(): void {
    this.bot.init();
  }
}
