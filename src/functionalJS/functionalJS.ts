const partial = function (fn: Function, ...partialArgs: any[]) {
  let args = partialArgs
  const f2: (...args: any[]) => any = (...fullArguments: any[]) => fn(...[...partialArgs, ...fullArguments])
  return f2
}

const range = (start: number, stop: number): number[] =>
  start >= stop ? [] : start === stop - 1 ? [stop - 1] : [start, ...range(start + 1, stop)]

const rangez = partial(range, 0) as (stop: number) => number[]

export { range, rangez }
