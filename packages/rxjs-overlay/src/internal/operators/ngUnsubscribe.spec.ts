import { interval } from 'rxjs';
import { ngUnsubscribe } from './ngUnsubscribe';
describe('test ngUnsubscribe', () => {
  it('unsubscribe on ngOnDestroy', (done) => {
    let wasOrginalNgOnDestroyExecuted = false;
    const component: any = {
      ngOnDestroy: () => {
        wasOrginalNgOnDestroyExecuted = true;
      },
    };
    interval(1000)
      .pipe(ngUnsubscribe(component))
      .subscribe({
        complete: () => {
          expect(wasOrginalNgOnDestroyExecuted).toBe(true);
          done();
        },
      });

    component.ngOnDestroy();
  });
});
