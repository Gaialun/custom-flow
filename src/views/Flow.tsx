import ReactFlow, { Controls, MiniMap } from 'reactflow'

import { DefaultNode, NodeOptions } from '../components'
import { useFlowStore } from '../store'


const nodeTypes = {
  defaultNode: DefaultNode
}

const defaultViewport = {
  x: 0,
  y: 0,
  zoom: 0.6
}

export function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange } = useFlowStore()

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      proOptions={{ hideAttribution: true }}
      defaultViewport={defaultViewport}
      nodeTypes={nodeTypes}
      minZoom={0.1}
      fitView
      attributionPosition='bottom-left'
    >
      <Controls />
      <MiniMap />
      <NodeOptions />
    </ReactFlow>
  )
}