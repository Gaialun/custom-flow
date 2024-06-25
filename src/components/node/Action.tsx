import { Button, Input, InputNumber } from 'antd'

import { useFlowStore } from '../../store'
import { useNodeStyle } from './hook'

export function AddNode() {
  const { addNode } = useFlowStore()
  return <Button onClick={addNode}>新增节点</Button>
}

export function RemoveNode() {
  const { selectedNodes, removeSelectedNode } = useFlowStore()

  return <Button disabled={!selectedNodes.size} onClick={removeSelectedNode}>移除节点</Button>
}


export function NodeOptions() {
  const { nodeStyle: defaultStyle, setNodeStyle } = useFlowStore()
  const { borderOptions, setBorderOptions } = useNodeStyle(defaultStyle)
  return (
    <div className="options-container">
      <b className="options-title">边框</b>
      <div className='options-item'>
        <label>宽度：</label>
        <InputNumber suffix="px" value={borderOptions.width} onChange={(width) => {
          if (width === null || width < 1) return
          setNodeStyle(setBorderOptions({ width }))
        }} />
      </div>
      <div className='options-item'>
        <label>颜色：</label>
        <Input type='color' value={borderOptions.color} onChange={(e) => {
          setNodeStyle(setBorderOptions({ color: e.target.value }))
        }} />
      </div>
    </div>
  )
}