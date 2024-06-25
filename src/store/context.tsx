import type { ReactNode } from "react"
import type { Edge, OnEdgesChange } from "reactflow"
import type { INodeStyle, NodesHookReturn } from "../components"

import { createContext, useContext, useState } from "react"
import { useEdgesState } from "reactflow"

import { type INode, nodeDefaultStyle, useNodes } from "../components"

type Context = {
  nodes: INode[]
  edges: Edge[]
  nodeStyle: INodeStyle
  setNodeStyle: (style: INodeStyle) => void
  addNode: () => void
  onEdgesChange: OnEdgesChange
} & Omit<NodesHookReturn, "selectedNodeStyle" | "setSelectedNodeStyle" | "addNode">
const context = createContext({} as Context)

export function FlowContextProvider({ children }: { children: ReactNode }) {
  const nodeOptions = useNodes()
  const [defaultNodeStyle, setDefaultNodeStyle] = useState<INodeStyle>(nodeDefaultStyle)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

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
    edges,
    onEdgesChange
  }}>
    {children}
  </context.Provider>
}


export const useFlowStore = () => useContext(context)