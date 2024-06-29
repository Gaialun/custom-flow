import type { Connection, OnEdgesChange } from "reactflow"
import type { IEdge } from "./type"

import { useCallback } from "react"
import { addEdge as addEdgeApi, useEdgesState } from "reactflow"

export type EdgesHookReturn = {
  edges: IEdge[]
  onEdgesChange: OnEdgesChange
  addEdge: (params: Connection) => void
  clearAllEdges: () => void
}

export function useEdges(): EdgesHookReturn {
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const addEdge = useCallback((params: Connection) => {
    console.log(params)
    setEdges((eds) => addEdgeApi({ type: "defaultEdge", ...params, style: { stroke: 'black', width: 100 } }, eds))
  }, [])

  const clearAllEdges = useCallback(() => {
    setEdges([])
  }, [])

  return {
    edges,
    onEdgesChange,
    addEdge,
    clearAllEdges
  }
}