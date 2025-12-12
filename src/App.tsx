import { Provider } from 'react-redux';
import Scene from './components/Scene';
import UIOverlay from './components/UIOverlay';
import { store } from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <div style={{
        width: '100vw',
        height: '100vh',
        background: '#1a1a2e',
        position: 'relative'
      }}>
        <Scene />
        <UIOverlay />
      </div>
    </Provider>
  );
}