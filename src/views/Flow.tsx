import { useMemo } from 'react'
import ReactFlow, { Controls, MiniMap } from 'reactflow'

import { Node, ToolsHeader } from '../components'
import { useFlowStore } from '../store'

export function Flow() {
  return (
    <>
      <ToolsHeader />
      <FlowChart />
    </>
  )
}

function FlowChart() {
  const { nodes, edges } = useFlowStore().store(({ nodes, edges }) => ({ nodes, edges }))
  console.log(nodes)
  const entities = useMemo(() => {
    return {
      nodeTypes: {
        // defaultNode: Node
      },
      edgeTypes: {

      }
    }
  }, [])


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      {...entities}
      proOptions={{ hideAttribution: true }}
      defaultViewport={{
        x: -200,
        y: 0,
        zoom: 0.6
      }}
      minZoom={0.1}
      fitView
      attributionPosition='bottom-left'
    >
      <MiniMap />
      <Controls />
    </ReactFlow>
  )
}