import type { Edge, EdgeProps } from "reactflow"


export interface IEdgeData {
  index: number
  text?: string
  style: IEdgeStyle
}

export interface IEdgeOptions {

}

export interface IEdgeStyle {
  stroke: string
}

export type IEdgeProps = EdgeProps<IEdgeData>

export type IEdge = Edge<IEdgeData>