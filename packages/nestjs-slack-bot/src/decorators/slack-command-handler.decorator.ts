import { Type } from '@nestjs/common';
import { commandsCollection } from '../bot';
import { SlackCommand } from '../interfaces/slack-command';

export function SlackCommandHandler(): (target: Type<SlackCommand>) => void {
  return (target: Type<SlackCommand>) => {
    commandsCollection.push(<Type<SlackCommand>>target);
  };
}
