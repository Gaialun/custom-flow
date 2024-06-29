import type { Draft } from "immer"

import { useState } from "react"
import { produce } from "immer"

export function useObjectState<State extends Record<string, any>>(initialState: State): [State, (newState: Partial<State>) => State] {
  const [state, setState] = useState<State>(initialState)

  const updateState = (partialState: Partial<State>) => {
    const newState = { ...state, ...partialState }
    setState(newState)
    return newState
  }
  return [state, updateState]
}

export function useImmerState<Data>(initial: Data | (() => Data)): [Data, (updateState: (prev: Draft<Data>) => any) => Data, (state: Data) => void] {
  const [state, setState] = useState<Data>(initial)

  const update = (updateState: (prev: Draft<Data>) => any) => {
    const newState = produce<Data>((prevState) => {
      updateState(prevState)
    })(state)
    setState(newState)
    return newState
  }

  return [state, update, setState]
}