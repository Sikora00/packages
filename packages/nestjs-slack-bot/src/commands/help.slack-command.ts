import { Injectable } from '@nestjs/common';
import { SlackCommand } from '../interfaces/slack-command';
import { Bot } from '../bot';
import { SlackCommandHandler } from '../decorators/slack-command-handler.decorator';
import { SlackService } from '../slack.service';
import { SlackMessage } from '../interfaces/slack-message.interface';


@SlackCommandHandler()
@Injectable()
export class HelpSlackCommand implements SlackCommand {
  description: string = 'list all available commands';
  type: string = 'help';

  constructor(private bot: Bot, private slack: SlackService) {}

  async handler(command: string[], message: SlackMessage): Promise<void> {
    let helpMsg = ``;

    Object.keys(this.bot.commands).forEach(key => {
      this.bot.commands[key].forEach(command => {
        const typeEmiticon = command.type.startsWith(':');
        if (!typeEmiticon) {
          helpMsg += `\``;
        }

        helpMsg += `${command.type}`;
        if (!typeEmiticon) {
          helpMsg += `\``;
        }

        helpMsg += ` - ${command.description}\n`;
      });
    });

    await this.slack.sendMessage(helpMsg, message.channel);
  }
}
