import Bar from './Bar/Bar'
import './App.css'
import EndpointRequest from '../types/EndpointRequest'
import JsonSection from './JsonSection/JsonSection'
import { useState } from 'react'

export default function App() {
  const [jsonInput, setJsonInput] = useState<string>('')

  async function handleRequestSent(request: EndpointRequest) {
    console.log(request.url)
    console.log(request.type)

    const response = await window.api.fetchFromNode(request.url)
    console.log(response)
    console.log(jsonInput)
  }

  return (
    <main>
      <Bar onSend={handleRequestSent} />
      <JsonSection title='Request body' editable={true} onInputChange={setJsonInput} />
    </main>
  )
}
