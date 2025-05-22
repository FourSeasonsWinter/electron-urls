import Bar from './Bar/Bar'
import './App.css'

export default function App() {

  function handleRequestSent(str: string) {
    console.log(str);
  }

  return (
    <main>
      <Bar
        onSend={handleRequestSent}
      />
    </main>
  )
}
