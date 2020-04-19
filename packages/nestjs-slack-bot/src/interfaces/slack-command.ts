import { SlackMessage } from './slack-message.interface';

export interface SlackCommand {
  /**
   * Description for help message.
   */
  description: string;
  /**
   * Callback executed when message's first word matches command.
   * @param event
   */
  handler: (command: string[], message: SlackMessage) => Promise<void>;
  /**
   * First word in slack message to bot. Handler is called when type matches first word in slack message.
   */
  type: string;
}
