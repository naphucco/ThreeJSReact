import Scene from './components/Scene'
import UIOverlay from './components/UIOverlay'

export default function App() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: '#1a1a2e',
      position: 'relative'
    }}>
      <Scene />
      <UIOverlay />
    </div>
  )
}