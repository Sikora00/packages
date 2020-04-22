import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SlackMessage } from '../../src';
import { SlackInterceptor } from '../../src/decorators/slack-middleware.decorator';
import {
  CallHandler,
  ISlackInterceptor,
} from '../../src/interfaces/slack-intercepotr.interface';

@SlackInterceptor()
@Injectable()
export class HelloInterceptor implements ISlackInterceptor {
  intercept(
    message: SlackMessage,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((res) => {
        if (res) {
          return `Hello Maciej\n${res}`;
        }
      })
    );
  }
}
