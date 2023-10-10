import { Optional } from './optional'

const value1 = Optional(1).process(() => 3).else(123)

const value2 = Optional([1, 2, 3]).map((value) => value * 2).else([])

const value3 = Optional<number[]>().map<string>().else(['123'])

console.log(value1, value2, value3)
