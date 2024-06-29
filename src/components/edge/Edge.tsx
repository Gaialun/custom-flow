import type { IEdgeProps } from "./type"

import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "reactflow"

export function DefaultEdge(props: IEdgeProps) {
  const { id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition, style, markerEnd } = props
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  console.log(labelY, labelX)
  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div style={{
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
        }}>222</div>
      </EdgeLabelRenderer>
    </>
  )
}
