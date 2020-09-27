import { Injectable } from '@nestjs/common';
import { ListenerFn } from 'eventemitter3';
import { EventEmitter } from 'events';
import { SlackMessage } from './interfaces/slack-message.interface';

@Injectable()
export class SlackTestingService {
  private eventEmitter = new EventEmitter();

  async sendMessage(message: string, channel: string): Promise<void> {}

  on(event: string, fn: ListenerFn, context?: any): void {
    this.eventEmitter.on(event, fn);
  }

  fakeReceiveMessage(event: string, message: SlackMessage): void {
    this.eventEmitter.emit(event, message);
  }
}
