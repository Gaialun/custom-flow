export const getValidValue = <T>(source: any, target: T) => {
  return source === target ? target : undefined
}

export const getValueIfInequality = <T>(source: any, target: T) => {
  return source === target ? null : target
}