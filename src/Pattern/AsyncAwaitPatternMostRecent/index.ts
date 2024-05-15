// two main approach of executing async functions , sequential and parallel

function asyncfunction1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("async function1 done ");
    }, 3000);
  });
}

function asyncfunction2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("async function2 done ");
    }, 4000);
  });
}

function asyncfunction3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("async function3 done ");
    }, 1000);
  });
}
const tasks = [asyncfunction1, asyncfunction2, asyncfunction3];

// RUNSEQUENTIAL
async function runSequential(tasks: any[], initialtime: number) {
  // send bulky
  const bulkyresult = [];

  for (const task of tasks) {
    const result = await task();
    bulkyresult.push(result);
    //   if you want quick result write in this menner
    //  whenever each async function finish you will see the result in console pannel
    // console.log(result);
  }
  const ending_point_timestamp = new Date().getTime();
  const resultarticle = timeTracker(
    initialtime,
    ending_point_timestamp,
    "sequential"
  );
  console.log(bulkyresult, resultarticle);
}
runSequential(tasks, new Date().getTime());

// RUNPARALLEL
async function runInParallel(tasks: any[], initialtime: number) {
  // never forget promise.all waits an array from you
  // in task array functions hasnt bootstraped yet so we need tp write an map method the give them ability of bootstraping(invoking)
  const result = await Promise.all(tasks.map((task) => task()));
  const ending_point_timestamp = new Date().getTime();
  console.log(
    result,
    timeTracker(initialtime, ending_point_timestamp, "parallel")
  );
}

runInParallel(tasks, new Date().getTime());

// time tracker
function timeTracker(
  initialtime: number,
  endtime: number,
  typeofAsyncFunction: FunctionType
) {
  const resulttime = endtime - initialtime;
  return ` ${typeofAsyncFunction} process has been completed in ${new Date(
    resulttime
  ).getSeconds()} seconds`;
}

type FunctionType = "sequential" | "parallel";
