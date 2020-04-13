import { MonoTypeOperatorFunction, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

/**
 * Automatically complete out subscription if a component is destroyed
 * @param component
 * @deprecated use https://github.com/ngneat/until-destroy instead
 */
export function ngUnsubscribe<T>(component: any): MonoTypeOperatorFunction<T> {
  const unsubscribe = new Subject();
  const oldOnDestroy = component.ngOnDestroy;
  component.ngOnDestroy = () => {
    if (oldOnDestroy) oldOnDestroy();
    unsubscribe.next();
    unsubscribe.complete();
  };
  return (source: Observable<T>) => source.pipe(takeUntil(unsubscribe));
}
