import type { Node, NodeProps } from "reactflow"

export type NodeType = "defaultNode" | ""

export interface INodeData {
  text: string
  index: number
  style: INodeStyle
}

export interface INodeOptions {
  width: INodeStyle['width']
  height: INodeStyle['height']
  backgroundColor: INodeStyle['backgroundColor']
  padding: INodeStyle['padding']
  border: {
    color: INodeStyle['borderColor']
    width: INodeStyle['borderWidth']
    style: INodeStyle['borderStyle']
    radius: INodeStyle['borderRadius']
  }
  label: {
    color: INodeStyle['color']
    fontSize: INodeStyle['fontSize']
    fontStyle?: INodeStyle['fontWeight'] | INodeStyle['fontStyle'] | INodeStyle['textDecoration'] | null
  }
}

export interface INodeStyle {
  width: number
  height: number
  padding: number
  borderStyle: "solid" | "dashed"
  borderWidth: number
  borderColor: string
  borderRadius: number
  fontSize: number
  fontWeight?: "bold"
  fontStyle?: "italic"
  color: string
  textDecoration?: "line-through"
  backgroundColor: string
}

export type INodeProps = NodeProps<INodeData>

export type INode = Node<INodeData, string | undefined>
