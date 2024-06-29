import type { OnNodesChange } from "reactflow"
import type { INode, INodeData, INodeOptions, INodeStyle } from "./type"

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useNodesState, useOnSelectionChange, useStoreApi } from "reactflow"
import { merge } from "lodash"

import { nodeOptions2Style, nodeStyle2Options } from "/@/utils/styles"

import { useImmerState } from "../../hooks"
import { NODE_DRAG_HANDLE_CLASS } from "./constants"


export type NodesHookReturn = {
  nodes: INode[]
  focusNode: INode | undefined
  selectedNodes: Map<string, INode>
  selectedNodeStyle: INodeStyle | undefined
  setSelectedNodeStyle: (nodeStyle: INodeStyle) => void
  setNodesStyle: (nodeStyle: INodeStyle) => void
  onNodesChange: OnNodesChange
  addNode: (defaultNode: INodeStyle) => void
  removeSelectedNode: () => void
  clearAllNodes: () => void
}
export function useNodes(): NodesHookReturn {
  const [nodes, setNodes, onNodesChange] = useNodesState<INodeData>([])
  const autoId = useRef(0)
  const [selectedNodes, setSelectedNodes] = useState<Map<string, INode>>(new Map())
  const store = useStoreApi()
  const addNode = useCallback((style: INodeStyle) => {
    setNodes((prevNodes) => {
      const nodeId = `node-${++autoId.current}`
      const newNode: INode = {
        id: nodeId,
        type: "defaultNode",
        position: { x: -500, y: -250 },
        dragHandle: `.${NODE_DRAG_HANDLE_CLASS}`,
        data: { text: `Node-${nodeId}`, index: prevNodes.length, style },
      }
      return [...prevNodes, newNode]
    })
  }, [])

  useOnSelectionChange({
    onChange({ nodes }) {
      setSelectedNodes(new Map(nodes.filter(({ selected }) => selected).map((node) => [node.id, node])))
    }
  })
  const removeSelectedNode = useCallback(() => {
    setNodes((prevNodes) => {
      const newNodes = prevNodes.filter(({ id }) => !selectedNodes.has(id))
      if (!newNodes.length) autoId.current = 0
      return newNodes
    })
    setSelectedNodes(new Map())
  }, [selectedNodes])

  const clearAllNodes = useCallback(() => {
    setNodes([])
    setSelectedNodes(new Map())
    autoId.current = 0
  }, [])

  const focusNode = useMemo(() => {
    const nodeId = [...selectedNodes.values()].pop()?.id
    return nodeId ? store.getState().nodeInternals.get(nodeId) : undefined
  }, [selectedNodes, nodes])

  const setSelectedNodeStyle = (nodeStyle: INodeStyle) => {
    if (!selectedNodes.size) return
    setNodes(nodes.map((node) => {
      if (selectedNodes.has(node.id)) {
        node.data = { ...node.data, style: { ...nodeStyle } }
      }
      return node
    }))
  }

  const setNodesStyle = (nodeStyle: INodeStyle) => {
    setNodes(nodes.map((node) => {
      node.data = { ...node.data, style: { ...nodeStyle } }
      return node
    }))
  }

  return {
    focusNode,
    selectedNodeStyle: focusNode?.data.style as INodeStyle | undefined,
    nodes: nodes as INode[],
    selectedNodes,
    addNode,
    removeSelectedNode,
    onNodesChange,
    setSelectedNodeStyle,
    setNodesStyle,
    clearAllNodes
  }
}

export type UpdateNodeOptionsParams = Partial<{
  border: Partial<INodeOptions['border']>
  label: Partial<INodeOptions['label']>
} & Omit<INodeOptions, "border" | "label">>
export function useNodeOptions(defaultStyle: INodeStyle) {
  const [nodeStyleOptions, setNodeStyleOptions, reset] = useImmerState<INodeOptions>(() => nodeStyle2Options(defaultStyle))

  useLayoutEffect(() => {
    reset(nodeStyle2Options(defaultStyle))
  }, [defaultStyle])

  return {
    nodeStyleOptions,
    setNodeStyleOptions(nodeOptions: UpdateNodeOptionsParams) {
      console.log(nodeOptions)
      return nodeOptions2Style(setNodeStyleOptions((state) => {
        merge(state, nodeOptions)
      }))
    }
  }
}