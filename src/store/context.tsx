import type { ReactNode } from "react"
import type { StoreApi, UseBoundStore } from "zustand"
import type { GlobalStore } from "./global"

import { createContext, useContext, useState } from "react"

import { createStore } from "./global"

type Context = {
  store: UseBoundStore<StoreApi<GlobalStore>>
}
const context = createContext({} as Context)

export function FlowContextProvider({ children }: { children: ReactNode }) {
  const [store] = useState<Context['store']>(createStore)

  return <context.Provider value={{ store }}>{children}</context.Provider>
}


export const useFlowStore = () => useContext(context)