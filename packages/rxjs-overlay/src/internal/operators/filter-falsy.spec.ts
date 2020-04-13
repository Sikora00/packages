import { cold } from 'jest-marbles';
import { filterFalsy } from './filter-falsy';

describe('test filter falsy', () => {
  test('emits truthy value', () => {
    const value = {};
    const expects = cold('-a', { a: value });
    expect(cold('-a', { a: value }).pipe(filterFalsy)).toBeObservable(expects);
  });
});
