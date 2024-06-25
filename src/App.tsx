import { ReactFlowProvider } from 'reactflow'
import "./styles/index.scss"
import 'reactflow/dist/style.css'

import { ToolsHeader } from './components'
import { FlowContextProvider } from './store'
import { Flow } from './views/Flow'

function App() {

  return (
    <ReactFlowProvider>
      <FlowContextProvider>
        <ToolsHeader />
        <Flow />
      </FlowContextProvider>
    </ReactFlowProvider>
  )
}

export default App
