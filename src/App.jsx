import { useState } from 'react';
import Board from './components/Board'

const App = () => {
  const [winner, setWinner] = useState('');
  const size = {
    r: 6,
    c: 7
  }
  return (
    <div className="App">
      <div className='top'>
        <div className='logo'>
          <div className='odd'></div>
          <div className='even'></div>
          <div className='even'></div>
          <div className='odd'></div>
        </div>

      </div>
      <Board size={size} setWinner={setWinner} />
      <div className={'bottom ' + winner}></div>
    </div>
  )
}

export default App
