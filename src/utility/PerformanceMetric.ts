// Single Power Class Type
class PerformanceMetric<T = any, R = void> {
  fn: (arg: T) => R;
  arg: T;
  constructor(fn: (arg: T) => R, arg: T) {
    this.fn = fn;
    this.arg = arg;
  }
  Execute() {
    if (this.fn === undefined || this.arg === undefined)
      return "No function Presented";

    const start = performance.now();
    const resultOfFunction = this.fn(this.arg);
    const end = performance.now();
    this.#Label(this.fn.name, resultOfFunction, end - start);
  }
  #Label(fnName: string, resultOfFunction: R, executiontime: number): void {
    console.log(
      `Function: ${fnName} Result: ${resultOfFunction}, Execution time: ${executiontime} ms`
    );
  }
}

// Multiple Case Performance Metric

class PerformanceMetricAll<T = any, R = void> {
  private case: { fn: (arg: T) => R; arg: T }[] = [];
  constructor() {}
  Load(fn: (arg: T) => R, arg: T): void {
    this.case.push({ fn, arg });
  }
  ExecuteAll() {
    if (this.case.length < 1) return console.log("No function presented");
    this.case.forEach((eachCase) => {
      const { fn, arg } = eachCase;
      const start = performance.now();
      const resultOfFunction = fn(arg);
      const end = performance.now();
      this.#Label(fn.name, resultOfFunction, end - start);
    });
  }
  ExecuteCase(index: number) {
    const { fn, arg } = this.case[index];
    const start = performance.now();
    const resultOfFunction = fn(arg);
    const end = performance.now();
    this.#Label(fn.name, resultOfFunction, end - start);
  }

  #Label(fnName: string, resultOfFunction: R, executiontime: number): void {
    console.log(
      `Function: ${fnName} Result: ${resultOfFunction}, Execution time: ${executiontime} ms`
    );
  }
}

export { PerformanceMetric, PerformanceMetricAll };
