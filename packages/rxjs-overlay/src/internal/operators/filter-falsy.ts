import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * alias for the `filter(Boolean)` operator
 * @param source$
 */
export function filterFalsy(source$: Observable<any>) {
  return source$.pipe(filter(Boolean));
}
