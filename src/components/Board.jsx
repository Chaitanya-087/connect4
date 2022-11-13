import React, { useEffect } from 'react'
import { useState } from 'react'

const Board = ({ size,setWinner,winner }) => {
  const { r, c } = size;
  const k = Math.max(r, c);
  const [board, setBoard] = useState(Array(r * c).fill(''))
  const [player, setPlayer] = useState('X')

  useEffect(() => {
    localStorage.setItem('winner', winner);
  },[winner])

  const handle = (idx) => {
    const newBoard = [...board];
    for (let i = r - 1; i >= 0; i--) {
      if (newBoard[idx % k] === '' && newBoard[i * k + idx % k] === '') {
        newBoard[i * k + idx % k] = player
        break;
      }
    }
    setBoard(newBoard);
    console.log(checkWinner(newBoard, player))
    setPlayer(prev => prev === 'X' ? 'O' : 'X');
  }

  const markWinner = (arr, player) => {
    const newBoard = [...board];
    arr.forEach(idx => newBoard[idx] = `${player} W`)
    setBoard(newBoard);
  }

  const checkWinner = (board, player) => {
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c - 3; j++) {
        if (board[i * k + j] === player && board[i * k + j + 1] === player && board[i * k + j + 2] === player && board[i * k + j + 3] === player) {
          markWinner([i * k + j, i * k + j + 1, i * k + j + 2, i * k + j + 3], player)
          setWinner(player)
          return true;
        }
      }
    }
    for (let i = 0; i < r - 3; i++) {
      for (let j = 0; j < c; j++) {
        if (board[i * k + j] === player && board[(i + 1) * k + j] === player && board[(i + 2) * k + j] === player && board[(i + 3) * k + j] === player) {
          markWinner([i * k + j, (i + 1) * k + j, (i + 2) * k + j, (i + 3) * k + j], player)
          setWinner(player)
          return true;
        }
      }
    }
    for (let i = 0; i < r - 3; i++) {
      for (let j = 0; j < c - 3; j++) {
        if (board[i * k + j] === player && board[(i + 1) * k + j + 1] === player && board[(i + 2) * k + j + 2] === player && board[(i + 3) * k + j + 3] === player) {
          markWinner([i * k + j, (i + 1) * k + j + 1, (i + 2) * k + j + 2, (i + 3) * k + j + 3], player)
          setWinner(player)
          return true;
        }
      }
    }
    for (let i = 0; i < r - 3; i++) {
      for (let j = 3; j < c; j++) {
        if (board[i * k + j] === player && board[(i + 1) * k + j - 1] === player && board[(i + 2) * k + j - 2] === player && board[(i + 3) * k + j - 3] === player) {
          markWinner([i * k + j, (i + 1) * k + j - 1, (i + 2) * k + j - 2, (i + 3) * k + j - 3], player)
          setWinner(player)
          return true;
        }
      }
    }
    return false;
  }
  return (
    <div className='grid' style={{ "--cols": c }}>
      {
        board.map((el, id) => <div key={id} className={'disc ' + el} onClick={() => handle(id)}></div>)
      }
    </div>
  )
}

export default Board
