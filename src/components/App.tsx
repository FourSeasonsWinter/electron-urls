import Bar from './Bar/Bar'
import './App.css'
import EndpointRequest from '../types/EndpointRequest'
import JsonSection from './JsonSection/JsonSection'
import { useState } from 'react'

export default function App() {
  const [jsonInput, setJsonInput] = useState<string>('')
  const [response, setResponse] = useState<string>('')

  async function handleRequestSent(request: EndpointRequest) {
    switch (request.type) {
      case 'GET':
        getRequest(request)
        break
      case 'POST':
        postRequest(request)
        break
    }
  }

  async function getRequest(request: EndpointRequest) {
    const response = await window.api.fetchFromNode(request.url)
    console.log('get', response)
    setResponse(response.status)
  }

  async function postRequest(request: EndpointRequest) {
    const json = parseJson(jsonInput)
    console.log('json', json)

    if (json === undefined) return

    const options = {
      method: request.type,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(json),
    }

    let response

    try {
      response = await window.api.fetchFromNode(request.url, options)
    } catch (err) {
      setResponse('Error fetching url')
    }

    console.log('post', response)
    setResponse(`status ${response.status}\n${response.body}`)
  }

  function parseJson(jsonString: string): string {
    try {
      const json = JSON.parse(jsonString)
      return json
    } catch (err) {
      setResponse('Error parsing json')
    }
  }

  return (
    <main>
      <Bar onSend={handleRequestSent} />
      <JsonSection
        title='Request body'
        content={jsonInput}
        onInputChange={setJsonInput}
      />
      <JsonSection title='Response' content={response} />
    </main>
  )
}
