import type { ReactNode } from "react"
import type { Edge, OnEdgesChange } from "reactflow"
import type { EdgesHookReturn, INodeStyle, NodesHookReturn } from "../components"

import { createContext, useContext, useState } from "react"

import { type INode, nodeDefaultStyle, useEdges, useNodes } from "../components"

type Context = {
  nodes: INode[]
  edges: Edge[]
  nodeStyle: INodeStyle
  setNodeStyle: (style: INodeStyle) => void
  addNode: () => void
  onEdgesChange: OnEdgesChange
} & Omit<NodesHookReturn, "selectedNodeStyle" | "setSelectedNodeStyle" | "addNode"> & EdgesHookReturn
const context = createContext({} as Context)

export function FlowContextProvider({ children }: { children: ReactNode }) {
  const nodeOptions = useNodes()
  const [defaultNodeStyle, setDefaultNodeStyle] = useState<INodeStyle>(nodeDefaultStyle)
  const edgesOptions = useEdges()

  const addNode = () => {
    nodeOptions.addNode(defaultNodeStyle)
  }

  const setNodeStyle = (nodeStyle: INodeStyle) => {
    if (nodeOptions.focusNode) {
      nodeOptions.setSelectedNodeStyle(nodeStyle)
    } else {
      setDefaultNodeStyle(nodeStyle)
    }
  }

  return <context.Provider value={{
    nodeStyle: nodeOptions.selectedNodeStyle ?? defaultNodeStyle,
    ...nodeOptions,
    addNode,
    setNodeStyle,
    ...edgesOptions
  }}>
    {children}
  </context.Provider>
}


export const useFlowStore = () => useContext(context)