import type { OnNodesChange } from "reactflow"
import type { INode, INodeOptions, INodeStyle, NodeData } from "./type"

import { useCallback, useLayoutEffect, useMemo, useState } from "react"
import { useNodesState, useOnSelectionChange } from "reactflow"

import { useObjectState } from "../../hooks"
import { NODE_DRAG_HANDLE_CLASS } from "./constants"


export type NodesHookReturn = {
  nodes: INode[]
  focusNode: INode | undefined
  selectedNodes: Map<string, INode>
  selectedNodeStyle: INodeStyle | undefined
  setSelectedNodeStyle: (nodeStyle: INodeStyle) => void
  onNodesChange: OnNodesChange
  addNode: (defaultNode: INodeStyle) => void
  removeSelectedNode: () => void
}
export function useNodes(): NodesHookReturn {
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([])
  const nodesMap = useMemo(() => {
    return new Map(nodes.map((node) => [node.id, node]))
  }, [nodes.length])
  const [selectedNodes, setSelectedNodes] = useState<Map<string, INode>>(new Map())
  const addNode = useCallback((style: INodeStyle) => {
    setNodes((prevNodes) => {
      const nodeId = `node-${prevNodes.length + 1}`
      const newNode: INode = {
        id: nodeId,
        type: "defaultNode",
        position: { x: 0, y: 50 },
        dragHandle: `.${NODE_DRAG_HANDLE_CLASS}`,
        data: { text: `Node-${nodeId}`, index: prevNodes.length, style },
      }
      return [...prevNodes, newNode]
    })
  }, [])

  useOnSelectionChange({
    onChange({ nodes: selectedNodes }) {
      if (!selectedNodes.length) setSelectedNodes(new Map())
      else setSelectedNodes(new Map(selectedNodes.map(({ id }) => [id, nodesMap.get(id)!])))
    }
  })

  const removeSelectedNode = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter(({ id }) => !selectedNodes.has(id)))
    setSelectedNodes(new Map())
  }, [selectedNodes])

  const focusNode = useMemo(() => [...selectedNodes.values()].pop(), [selectedNodes])

  const setSelectedNodeStyle = (nodeStyle: INodeStyle) => {
    if (!selectedNodes.size) return
    const currentNodes = [...selectedNodes.values()]
    currentNodes.forEach((node) => {
      node.data.style = nodeStyle
    })
    setNodes([...nodes])
  }

  return {
    focusNode,
    selectedNodeStyle: focusNode?.data.style as INodeStyle | undefined,
    nodes: nodes as INode[],
    selectedNodes,
    addNode,
    removeSelectedNode,
    onNodesChange,
    setSelectedNodeStyle
  }
}

export function useNodeStyle(defaultStyle: INodeStyle) {
  const [labelOptions, setLabelOptions] = useObjectState<INodeOptions['label']>({
    color: defaultStyle.color,
    fontSize: defaultStyle.fontSize
  })
  const [borderOptions, setBorderOptions] = useObjectState<INodeOptions['border']>({
    color: defaultStyle.borderColor,
    width: defaultStyle.borderWidth,
    style: defaultStyle.borderStyle,
    radius: defaultStyle.borderRadius,
  })

  const [width, setWidth] = useState(140)
  const [height, setHeight] = useState(40)

  const getStyle = (options: Partial<INodeOptions>) => {
    const _labelOptions = options.label ?? labelOptions
    const _borderOptions = options.border ?? borderOptions
    return {
      width: options.width ?? width,
      height: options.height ?? height,
      fontSize: _labelOptions.fontSize,
      color: _labelOptions.color,
      borderWidth: _borderOptions.width,
      borderColor: _borderOptions.color,
      borderRadius: _borderOptions.radius,
      borderStyle: "solid" as INodeStyle['borderStyle']
    }
  }

  useLayoutEffect(() => {
    setWidth(defaultStyle.width)
    setHeight(defaultStyle.height)
    setLabelOptions({ color: defaultStyle.color, fontSize: defaultStyle.fontSize })
    setBorderOptions({
      color: defaultStyle.borderColor,
      width: defaultStyle.borderWidth,
      style: defaultStyle.borderStyle,
      radius: defaultStyle.borderRadius
    })
  }, [defaultStyle])

  return {
    width,
    height,
    labelOptions,
    borderOptions,
    setWidth(width: number) {
      setWidth(width)
      return getStyle({ width })
    },
    setHeight(height: number) {
      setWidth(height)
      return getStyle({ height })
    },
    setLabelOptions(labelOptions: Partial<INodeOptions["label"]>) {
      return getStyle({ label: setLabelOptions(labelOptions) })
    },
    setBorderOptions(borderOptions: Partial<INodeOptions['border']>) {
      return getStyle({ border: setBorderOptions(borderOptions) })
    }
  }
}