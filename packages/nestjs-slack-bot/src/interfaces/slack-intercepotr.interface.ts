/**
 * Interface providing access to the response stream.
 *
 * @publicApi
 */
import { Observable } from 'rxjs';
import { SlackMessage } from './slack-message.interface';

export interface CallHandler<T = any> {
  /**
   * Returns an `Observable` reprsenting the response stream from the message
   * handler.
   */
  handle(): Observable<T>;
}
/**
 * Interface describing implementation of an interceptor.
 *
 * @see [Interceptors](https://docs.nestjs.com/interceptors)
 *
 * @publicApi
 */
export interface ISlackInterceptor<T = any, R = any> {
  /**
   * Method to implement a custom interceptor.
   *
   * @param message data about the slack message which will be handled
   * @param next a reference to the `CallHandler`, which provides access to an
   * `Observable` representing the response stream from the message handler.
   */
  intercept(
    message: SlackMessage,
    next: CallHandler<T>
  ): Observable<R> | Promise<Observable<R>>;
}
