class OptionalCreator<T> {
  private processedValue: any
  private readonly receivedValue: any

  constructor (receivedValue?: T) {
    this.receivedValue = receivedValue
  }

  public process<U>(callback?: (value: T) => U) {
    if (this.receivedValue != null && callback != null) {
      try {
        this.processedValue = callback(this.receivedValue)
      } catch (error) {
        console.error(`Error processing value: ${String(error)}`)
      }
    }

    return { else: (value: U) => this.else<U>(value) }
  }

  public map<U>(mapFn?: (value: T extends Array<infer U> ? U : never) => U) {
    if (this.receivedValue != null && this.receivedValue instanceof Array && mapFn != null) {
      try {
        this.processedValue = this.receivedValue.map(mapFn)
      } catch (error) {
        console.error(`Error processing value: ${String(error)}`)
      }
    }

    return { else: (value: U[]) => this.else<U[]>(value) }
  }

  private else<V>(fallbackValue: V) {
    if (this.processedValue != null) {
      return this.processedValue as V
    }

    return fallbackValue
  }
}

export const Optional = <T>(value?: T) => {
  return new OptionalCreator(value)
}
