import { Injectable } from '@nestjs/common';
import { RTMClient } from '@slack/client';
import { ListenerFn } from 'eventemitter3';

@Injectable()
export class SlackService {
  private readonly _rtm: RTMClient;

  constructor(token: string) {
    this._rtm = new RTMClient(token);
    this._rtm.start({});
  }

  sendMessage(message: string, channel: string): Promise<void> {
    return this._rtm.sendMessage(message, channel).then();
  }

  on(event: string, fn: ListenerFn, context?: any): void {
    this._rtm.on(event, fn, context);
  }
}
