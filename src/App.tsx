import { Provider } from 'react-redux';
import Scene from './components/Scene';
import LeftUI from './components/LeftUI';
import { store } from './redux/store';
import RightUI from './components/RightUI';

export default function App() {
  return (
    <Provider store={store}>
      <Scene />
      <LeftUI />
      <RightUI />
    </Provider>
  );
}