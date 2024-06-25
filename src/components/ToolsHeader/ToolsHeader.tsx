
import { AddNode, RemoveNode } from '../node'

export function ToolsHeader() {
  return (
    <div className='header tools-container'>
      <AddNode />
      <RemoveNode />
    </div>
  )
}
