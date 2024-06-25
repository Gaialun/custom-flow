import type { Node, NodeProps } from "reactflow"

export type NodeType = "defaultNode" | ""

export interface NodeData {
  text: string
  index: number
  style: INodeStyle
}

export interface INodeOptions {
  width: INodeStyle['width']
  height: INodeStyle['height']
  border: {
    color: INodeStyle['borderColor']
    width: INodeStyle['borderWidth']
    style: INodeStyle['borderStyle']
    radius: INodeStyle['borderRadius']
  }
  label: {
    color: string
    fontSize: number
    fontStyle?: "bold" | "tilt"
  }
}

export interface INodeStyle {
  width: number
  height: number
  borderStyle: "solid" | "dashed"
  borderWidth: number
  borderColor: string
  borderRadius: string
  fontSize: number
  color: string
}

export type INodeProps = NodeProps<NodeData>

export type INode = Node<NodeData, string | undefined>
