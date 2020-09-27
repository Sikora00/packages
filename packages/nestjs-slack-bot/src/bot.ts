import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Observable } from 'rxjs';
import { InterceptorsConsumer } from './interceptors.consumer';
import { SlackCommand } from './interfaces/slack-command';
import { ISlackInterceptor } from './interfaces/slack-intercepotr.interface';
import { SlackMessage } from './interfaces/slack-message.interface';
import { SlackService } from './slack.service';

export const interceptorsCollection: Type<ISlackInterceptor>[] = [];
export const commandsCollection: Type<SlackCommand>[] = [];

@Injectable()
export class Bot {
  commands: { [key: string]: SlackCommand } = {};
  interceptors: ISlackInterceptor[] = [];

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly interceptorsConsumer: InterceptorsConsumer,
    private slack: SlackService
  ) {}

  async init(): Promise<void> {
    await Promise.all([this.resolveCommands(), this.resolveInterceptors()]);
    this.start();
  }

  addCommand(command: SlackCommand): void {
    this.commands[command.type] = command;
  }

  async handleMessage(message: SlackMessage): Promise<void> {
    if (
      !message.user ||
      message.type !== 'message' ||
      message.subtype === 'bot_message'
    ) {
      return;
    }

    const command = message.text.split(' ');
    const commandHandler = this.commands[command[0]];

    if (commandHandler) {
      let response = await this.interceptorsConsumer.intercept(
        message,
        this.interceptors,
        commandHandler,
        async () => commandHandler.handler(command, message)
      );
      if (response instanceof Observable) {
        response = response.toPromise();
      }
      if (response instanceof Promise) {
        response = await response;
      }
      if (typeof response === 'string') {
        this.slack.sendMessage(response, message.channel);
      }
    }
  }

  async resolveCommands(): Promise<void> {
    const addCommand = this.addCommand.bind(this);
    const commandHandlers = await Promise.all(
      commandsCollection.map((type) => this.moduleRef.create(type))
    );
    commandHandlers.forEach(addCommand);
  }

  async resolveInterceptors(): Promise<void> {
    this.interceptors = await Promise.all(
      interceptorsCollection.map((type) => this.moduleRef.create(type))
    );
  }

  start(): void {
    this.slack.on('message', this.handleMessage.bind(this));
  }
}
