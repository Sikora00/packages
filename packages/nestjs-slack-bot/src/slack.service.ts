import { Injectable } from '@nestjs/common';
import { RTMClient, WebClient } from '@slack/client';
import { ListenerFn } from 'eventemitter3';

@Injectable()
export class SlackService {
  private readonly _rtm: RTMClient;
  private readonly _web: WebClient;

  constructor(token: string) {
    this._rtm = new RTMClient(token);
    this._web = new WebClient(token);
    this._rtm.start({});
  }

  sendMessage(message: string, channel: string): Promise<void> {
    return this._rtm.sendMessage(message, channel).then();
  }

  on(event: string, fn: ListenerFn, context?: any): void {
    this._rtm.on(event, fn, context);
  }
}
