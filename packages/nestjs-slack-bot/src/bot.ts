import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { SlackCommand } from './interfaces/slack-command';
import { SlackService } from './slack.service';

export const commandsCollection: Type<SlackCommand>[] = [];

@Injectable()
export class Bot {
  commands: { [key: string]: SlackCommand[] } = {};

  constructor(
    private slack: SlackService,
    private readonly moduleRef: ModuleRef
  ) {
  }

  async init(): Promise<void> {
    const addCommand = this.addCommand.bind(this);
    const commandHandlers = await Promise.all(
      commandsCollection.map(type => this.moduleRef.create(type))
    );
    commandHandlers.forEach(addCommand);
    this.start();
  }

  addCommand(command: SlackCommand): void {
    let commands = this.commands[command.type];

    if (!commands) {
      commands = this.commands[command.type] = [];
    }

    commands.push(command);
  }

  handleMessage(message: any): void {
    if (
      !message.user ||
      message.type !== 'message' ||
      message.subtype === 'bot_message'
    ) {
      return;
    }

    const command = message.text.split(' ');
    const commands = this.commands[command[0]];

    if (commands && commands.length) {
      commands.forEach(c => {
        c.handler(command, message);
      });
    }
  }

  start(): void {
    this.slack.on('message', this.handleMessage.bind(this));
  }
}
