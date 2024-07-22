// work logic , higher function takes the function logic as a argument return a new function and gives this new function to ability of accept argument and make this newly given argument to bootstrap previously the given functions

type AnyFunction = (...args: any[]) => any;

function logArgument<T extends AnyFunction>(func: T): T {
  return function (...args: Parameters<T>): ReturnType<T> {
    console.log(`Argument for the ${func.name} function is :`, args);
    console.log(`details about function`, func.length, func.name);

    // @ts-ignore
    return func.apply(this, args);
  } as T;
}

function add(a: number, b: number): number {
  return a + b;
}

// const loggedfunction = logArgument(add);
// console.log(loggedfunction(3, 5));

function logger<T extends AnyFunction>(func: T) {
  return function (...args: any) {
    // logging
    console.log(func.name, args);
    // @ts-ignore
    return func.apply(this, args);
  };
}

const loggedFunction = logger(add);
console.log(loggedFunction(3, 5));

// usage reason off apply and bind method

// In JavaScript, call, apply, and bind are methods that allow you to set the value of this and invoke functions in different ways. These methods are particularly useful for controlling the context in which a function executes.
// call Method
// The call method calls a function with a given this value and arguments provided individually.
// apply Method
// The apply method is similar to call, but it takes an array of arguments instead of listing them individually.
// bind Method
// The bind method creates a new function that, when called, has its this value set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.
