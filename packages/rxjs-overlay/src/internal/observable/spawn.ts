import { spawn as spawnL, SpawnOptions } from 'child_process';
import { Observable, Subject } from 'rxjs';

export interface SpawnResult {
  signal$: Observable<number>;
  execSpawn: () => Observable<number>;
}

/**
 * Return a function which will spawn a command and emmit close code when command resolve itself
 * @param command
 * @param args
 * @param options
 */
export function spawn(
  command: string,
  args?: ReadonlyArray<string>,
  options?: SpawnOptions
): SpawnResult {
  const signal$ = new Subject<number>();
  const execSpawn = () => {
    const signal = spawnL(command, args, options);

    signal.on('close', (code: number | undefined) => {
      signal$.next(code);
      signal$.complete();
    });
    return signal$;
  };
  return { execSpawn, signal$ };
}
