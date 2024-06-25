import type { INodeStyle } from "./type"

export const NODE_DRAG_HANDLE_CLASS = "node-drag-handle"

export const nodeDefaultStyle: INodeStyle = Object.freeze({
  width: 140,
  height: 20,
  fontSize: 14,
  color: "#000",
  borderRadius: "4px",
  borderStyle: "solid",
  borderColor: "#e5e7eb",
  borderWidth: 1,
  display: "inline-block",
  background: "#fff",
}
)
