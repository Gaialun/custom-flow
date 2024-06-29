import type { INodeProps } from './type'

import { memo } from 'react'
import { Handle, Position } from 'reactflow'

import { NODE_DRAG_HANDLE_CLASS } from './constants'

export const DefaultNode = memo((props: INodeProps) => {
  // console.log(props)
  return (
    <>
      <Handle id={`left_target-${props.data.index}`} type='target' position={Position.Left} isConnectable={props.isConnectable}></Handle>
      <Handle id={`left_source-${props.data.index}`} type='source' position={Position.Left} isConnectable={props.isConnectable}></Handle>
      <div className={`${NODE_DRAG_HANDLE_CLASS} node-content`} style={props.data.style}>
        {props.data.text}
      </div>
      <Handle id={`right-target-${props.data.index}`} type='target' position={Position.Right} isConnectable={props.isConnectable}></Handle>
      <Handle id={`right_source-${props.data.index}`} type='source' position={Position.Right} isConnectable={props.isConnectable}></Handle>
      {props.selected && <div className='node-selected'></div>}
    </>
  )
})
