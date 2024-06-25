import { useState } from "react"

export function useObjectState<State extends Record<string, any>>(initialState: State): [State, (newState: Partial<State>) => State] {
  const [state, setState] = useState<State>(initialState)

  const updateState = (partialState: Partial<State>) => {
    const newState = { ...state, ...partialState }
    setState(newState)
    return newState
  }
  return [state, updateState]
}