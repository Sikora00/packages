import { Type } from '@nestjs/common';
import { interceptorsCollection } from '../bot';
import { ISlackInterceptor } from '../interfaces/slack-intercepotr.interface';

export function SlackInterceptor(): (target: Type<ISlackInterceptor>) => void {
  return (target: Type<ISlackInterceptor>) => {
    interceptorsCollection.push(<Type<ISlackInterceptor>>target);
  };
}
