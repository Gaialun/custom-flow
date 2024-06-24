import type { Edge, Node } from "reactflow"

import { create } from 'zustand'

export interface GlobalStore {
  nodes: Node[]
  edges: Edge[]


  addNode: () => Node
}


export const createStore = () => {
  return create<GlobalStore>((set, get) => ({
    nodes: [],
    edges: [],

    addNode() {
      const nodeId = `node-${get().nodes.length + 1}`
      const newNode: Node = {
        id: nodeId,
        position: { x: 0, y: 50 },
        data: { label: `CustomNode-${nodeId}` }
      }
      set({ nodes: [...get().nodes, newNode] })
      return newNode
    }
  }))
}