const module1: any = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unboundGetX = module1.getX.bind(module1);
console.log(unboundGetX());

export {};
