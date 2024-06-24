import { ReactFlowProvider } from 'reactflow'
import './App.scss'

import { FlowContextProvider } from './store'
import { Flow } from './views/Flow'

function App() {

  return (
    <ReactFlowProvider>
      <FlowContextProvider>
        <Flow />
      </FlowContextProvider>
    </ReactFlowProvider>
  )
}

export default App
