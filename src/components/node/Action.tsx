import { useReactFlow } from 'reactflow'
import { Button } from 'antd'

import { useFlowStore } from '../../store'

export function AddNode() {
  const addNode = useFlowStore().store(({ addNode }) => addNode)
  console.log('render...')
  return <Button onClick={addNode}>新增节点</Button>
}