import Bar from './Bar/Bar'
import './App.css'

export default function App() {
  return (
    <main>
      <Bar
        onSend={() => {
          console.log('request sent')
        }}
      />
    </main>
  )
}
