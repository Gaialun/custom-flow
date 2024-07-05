import ReactFlow, { Controls, MiniMap } from 'reactflow'

import { DefaultEdge, DefaultNode, NodeOptions } from '../components'
import { useFlowStore } from '../store'


const nodeTypes = {
  defaultNode: DefaultNode,
}

const edgeTypes = {
  defaultEdge: DefaultEdge
}

const defaultViewport = {
  x: 0,
  y: 0,
  zoom: 1
}

export function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, addEdge } = useFlowStore()

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={addEdge}
      proOptions={{ hideAttribution: true }}
      defaultViewport={defaultViewport}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      minZoom={0.1}
      fitView
      multiSelectionKeyCode={"Control"}
      attributionPosition='bottom-left'
    >
      <Controls />
      <MiniMap />
      <NodeOptions />
    </ReactFlow>
  )
}