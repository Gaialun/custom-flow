import { useReactFlow } from "reactflow"
import { Button } from "antd"

import { useFlowStore } from "../store"

export function FixCenter() {
  const { fitView } = useReactFlow()
  const { focusNode } = useFlowStore()

  const handleClick = () => {
    fitView({ nodes: focusNode ? [{ id: focusNode.id }] : undefined })
  }
  return <Button onClick={handleClick}>居中显示</Button>
}