import { Injectable } from '@nestjs/common';
import { Bot } from '../bot';
import { SlackCommandHandler } from '../decorators/slack-command-handler.decorator';
import { SlackCommand } from '../interfaces/slack-command';
import { SlackMessage } from '../interfaces/slack-message.interface';

@SlackCommandHandler()
@Injectable()
export class HelpSlackCommand implements SlackCommand {
  description: string = 'list all available commands';
  type: string = 'help';

  constructor(private bot: Bot) {}

  async handler(command: string[], message: SlackMessage): Promise<string> {
    let helpMsg = ``;

    Object.keys(this.bot.commands).forEach((key) => {
      const command = this.bot.commands[key];
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

    return helpMsg;
  }
}
