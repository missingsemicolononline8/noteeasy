import './App.css';
import Foreground from './components/Foreground';
import Background from './components/Background';

function App() {

  return (
    <div className='w-full h-screen relative'>
      <Background />
      <Foreground />
    </div>
  )

}

export default App;
