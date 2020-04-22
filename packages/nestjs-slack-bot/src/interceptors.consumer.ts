import { defer, from, Observable } from 'rxjs';
import { mergeAll, switchMap } from 'rxjs/operators';
import { SlackCommand } from './interfaces/slack-command';
import {
  CallHandler,
  ISlackInterceptor,
} from './interfaces/slack-intercepotr.interface';
import { SlackMessage } from './interfaces/slack-message.interface';

export class InterceptorsConsumer {
  public async intercept(
    message: SlackMessage,
    interceptors: ISlackInterceptor[],
    instance: SlackCommand,
    next: () => Promise<unknown>
  ): Promise<unknown> {
    if (interceptors.length === 0) {
      return next();
    }

    const start$ = defer(() => this.transformDeffered(next));
    const nextFn = (i = 0) => async () => {
      if (i >= interceptors.length) {
        return start$;
      }
      const handler: CallHandler = {
        handle: () => from(nextFn(i + 1)()).pipe(mergeAll()),
      };
      return interceptors[i].intercept(message, handler);
    };
    return nextFn()();
  }

  public transformDeffered(next: () => Promise<any>): Observable<any> {
    return from(next()).pipe(
      switchMap((res) => {
        const isDeffered = res instanceof Promise || res instanceof Observable;
        return isDeffered ? res : Promise.resolve(res);
      })
    );
  }
}
