import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { Bot } from './bot';
import { HelpSlackCommand } from './commands/help.slack-command';
import { InterceptorsConsumer } from './interceptors.consumer';
import { SlackBotModuleOptions } from './interfaces/slack-bot-module-options.interface';
import { SlackService } from './slack.service';

const SLACK_TOKEN = Symbol('SLACK_TOKEN');

@Module({})
export class SlackBotModule implements OnModuleInit {
  static forRoot(options: SlackBotModuleOptions): DynamicModule {
    return {
      module: SlackBotModule,
      providers: [
        Bot,
        HelpSlackCommand,
        InterceptorsConsumer,
        {
          provide: SLACK_TOKEN,
          useValue: options.slackToken,
        },
        {
          provide: SlackService,
          useFactory: (slackToken: string) => new SlackService(slackToken),
          inject: [SLACK_TOKEN],
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
