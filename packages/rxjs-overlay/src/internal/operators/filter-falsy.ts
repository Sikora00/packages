import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

export function filterFalsy(source$: Observable<any>) {
  return source$.pipe(filter(Boolean));
}
