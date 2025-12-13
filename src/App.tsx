import { Provider } from 'react-redux';
import Scene from './components/Scene';
import LeftUI from './components/LeftUI';
import { store } from './redux/store';
import RightUI from './components/RightUI';

export default function App() {
  return (
    <Provider store={store}>
      <div style={{
        width: '100vw',
        height: '100vh',
        background: '#2e1a1aff',
        position: 'relative'
      }}>
        <Scene />
        <LeftUI />
        <RightUI />
      </div>
    </Provider>
  );
}