import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { Bot } from './bot';
import { HelpSlackCommand } from './commands/help.slack-command';
import { SlackBotModuleOptions } from './interfaces/slack-bot-module-options.interface';
import { SlackService } from './slack.service';

@Module({})
export class SlackBotModule implements OnModuleInit {
  static forRoot(options: SlackBotModuleOptions): DynamicModule {
    return {
      module: SlackBotModule,
      providers: [
        {
          provide: SlackService, useValue: new SlackService(options.slackToken)
        },
        Bot,
        HelpSlackCommand
      ],
      exports: [SlackService]
    };
  }

  constructor(private bot: Bot) {
  }

  onModuleInit(): void {
    this.bot.init();
  }
}
