import { spawn } from "./spawn";

describe("test spawn", () => {
  it("emit status code 0 and complete observable after spawning by execSpawn", (done) => {
    const { signal$, execSpawn } = spawn("ls");
    signal$.subscribe({
      next: (code: number) => {
        expect(code).toBe(0);
      },
      complete: () => {
        done();
      },
    });
    execSpawn();
  });
});
