
import { AddNode, ClearAllNodes, RemoveNode } from '../node'
import { FixCenter } from '../ViewportActions'

export function ToolsHeader() {
  return (
    <div className='header tools-container'>
      <AddNode />
      <RemoveNode />
      <ClearAllNodes />
      <FixCenter />
    </div>
  )
}
