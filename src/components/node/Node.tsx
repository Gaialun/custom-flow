import type { INodeProps } from './type'

import { memo } from 'react'
import { Handle, Position } from 'reactflow'

import { NODE_DRAG_HANDLE_CLASS } from './constants'

export const DefaultNode = memo((props: INodeProps) => {
  console.log(props)
  return (
    <>
      <Handle type='target' position={Position.Left}></Handle>
      <div className={`${NODE_DRAG_HANDLE_CLASS} node-content`} style={props.data.style}>
        {props.data.text}
      </div>
      <Handle type='source' position={Position.Right}></Handle>
      {props.selected && <div className='node-selected'></div>}
    </>
  )
})
