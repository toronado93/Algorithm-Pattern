const EventEmitter = require("events");

type AsyncFunctionType = {
  funcName: string;
  funcBody: () => Promise<string>;
};

// the function creates random amaount of async function between minimum and max  and give them random completed time
const createRandomAsyncFunctions = (min: number, max: number): any => {
  const funcArray = [];
  // create
  const functionAmount = Math.floor(Math.random() * (max - min) + min);
  //   Function set

  //   Build up to function
  for (let i = 1; i <= functionAmount; i++) {
    // relevant async function complete time
    const asyncFunctionCompleteTime = Math.random() * (5000 - 1000) + 1000;
    const timingsecwise = asyncFunctionCompleteTime / 1000;
    // dynamic function name
    const funcName = `asyncFunction${i}`;
    // create function body
    const funcBody = (): Promise<string> => {
      // Async function will return resolve or reject depens on the timing
      // if they take more than 3 seconds , function will be failed.
      if (timingsecwise > 3) {
        return new Promise((resolve, rejected) => {
          setTimeout(() => {
            rejected(`${funcName} is refected cause take than 3 sec`);
          }, asyncFunctionCompleteTime);
        });
      } else {
        return new Promise((resolve, rejected) => {
          setTimeout(() => {
            resolve(
              `${funcName} is completed in ${timingsecwise.toFixed(2)} sec`
            );
          }, asyncFunctionCompleteTime);
        });
      }
    };
    const completedFunc: AsyncFunctionType = {
      funcName,
      funcBody,
    };
    // add function to array
    funcArray.push(completedFunc);
  }

  return funcArray;
};

// Task Manager Stracture (this taskmanager limit the amount of parallel async working)

class TaskManager extends EventEmitter {
  private Queue: AsyncFunctionType[] = [];
  private RemainingTasks: AsyncFunctionType[] = [];
  private CompletedTasks: any[] = [];
  private limitation;
  private startTimeStamp: number;
  private endingTimeStamp: number | undefined;

  constructor(limitParallelExecution: number) {
    super();
    this.limitation = limitParallelExecution;
    this.startTimeStamp = new Date().getTime();
  }
  //  Engine function runs the task manager until tasks are completed ()
  async run(tasks: AsyncFunctionType[]) {
    this.RemainingTasks = tasks;
    while (!this.taskCompleteControl()) {
      //   We need producer which put the next task in to the queue if the queue is available
      // 1- Method take the next task from remaining into the queue
      this.QueueProducer();
      //   Monitoring
      this.activeInformation();
      // 2- Run the tasks in queue , when they finish take them from queue and put it into completed tasks
      await this.TaskRunnerEngine();
    }
    this.endingTimeStamp = new Date().getTime();
    this.resultReport();
  }

  //   Method responsible with filling queue
  QueueProducer() {
    while (
      this.Queue.length < this.limitation &&
      this.RemainingTasks.length > 0
    ) {
      const oncomingTask = this.RemainingTasks.shift();
      if (oncomingTask !== undefined) {
        this.Queue.push(oncomingTask);
      }
    }
  }

  // method responsible to execute methods
  async TaskRunnerEngine() {
    const runningTasks = this.Queue.map((task) => this.executeTask(task));
    await Promise.all(runningTasks);
  }

  async executeTask(task: AsyncFunctionType) {
    try {
      const result = await task.funcBody();
      const preparedResult = {
        status: "success",
        funcname: task.funcName,
        result: result,
      };
      this.CompletedTasks.push(preparedResult);
      this.Queue = this.Queue.filter((t) => t !== task);
    } catch (error) {
      const preparedResult = {
        status: "fail",
        funcname: task.funcName,
        result: error,
      };
      this.CompletedTasks.push(preparedResult);
      this.Queue = this.Queue.filter((t) => t !== task);
    }
  }

  //   method complete the task
  taskCompleteControl(): boolean {
    if (this.RemainingTasks.length === 0 && this.Queue.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  //   method for giving active information during process
  activeInformation() {
    const info = {
      Start: new Date(this.startTimeStamp).toISOString(),
      RunningTasks: this.Queue.length,
      CompletedTasks: this.CompletedTasks.length,
      RemainingTasks: this.RemainingTasks.length,
    };
    this.emit("info", info);
  }

  //   method gives the result report when tas is completed
  resultReport() {
    const duration = this.endingTimeStamp
      ? this.endingTimeStamp - this.startTimeStamp
      : 0;
    console.log(`All tasks completed in ${duration / 1000} sec`);
    console.log("Completed Tasks:", this.CompletedTasks);
  }
}

// Bootstrap
const taskmanager = new TaskManager(2).on("info", (result: any) => {
  console.log(result);
});
taskmanager.run(createRandomAsyncFunctions(5, 10));
export {};
