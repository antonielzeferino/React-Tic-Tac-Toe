import { useState } from "react"

export default function App() {
  const [vBoard, setVBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']])
  const [winnerCombination, setWinnerCombiantion] = useState([])

  const handleCellClick = (el) => {
    if (!winnerCombination.some((c) => "a")) {
      console.clear()
      verifyWin()
      const position = el.getAttribute("data-value")
      if (!vBoard[position[0]][position[2]]) {
        vBoard[position[0]][position[2]] = 'X'
        npcPlay()
      }
      console.table(vBoard)
    }
  }

  const npcPlay = () => {
    const row = Math.floor(Math.random() * 3)
    const coll = Math.floor(Math.random() * 3)
    if (!vBoard[row][coll]) {
      vBoard[row][coll] = 'O'
    } else {
      if (!winnerCombination.some((c) => "a")) {
        npcPlay()
      }
    }
  }

  const checkRowsAndColumns = () => {
    for (let i = 0; i < 3; i++) {
      const rowCombination = [
        [i, 0],
        [i, 1],
        [i, 2]
      ];
      const columnCombination = [
        [0, i],
        [1, i],
        [2, i]
      ];

      const diagonalCombination1 = [
        [0, 0],
        [1, 1],
        [2, 2]
      ];

      const diagonalCombination2 = [
        [0, 2],
        [1, 1],
        [2, 0]
      ];

      checkCombination(rowCombination);
      checkCombination(columnCombination);
      checkCombination(diagonalCombination1);
      checkCombination(diagonalCombination2);
    }
  };

  const checkCombination = (combination) => {
    const [a, b, c] = combination;
    const cellA = vBoard[a[0]][a[1]];
    const cellB = vBoard[b[0]][b[1]];
    const cellC = vBoard[c[0]][c[1]];

    if (cellA === cellB && cellA === cellC && cellA !== '') {
      setWinnerCombiantion(combination)
      console.log(combination)
      return;
    }
  };

  const verifyWin = () => {
    if (checkRowsAndColumns()) {
      setWinner(true)
    }
  }

  const startGame = () => {
    setVBoard([['', '', ''], ['', '', ''], ['', '', '']])
     document.querySelectorAll(".gameCells").forEach((cell) => {
      cell.classList.remove('winner')
      setWinnerCombiantion([])
    })
  }

  return (
    <div>
      <header>
        <h1>Tic-Tac-Toe</h1>
        <hr />
      </header>
      <div className="board">
        <span
          className={`gameCells ${winnerCombination.some(comb => comb[0] === 0 && comb[1] === 0) ? 'winner' : ''}`}
          data-value="0.0"
          onClick={(el) => handleCellClick(el.target)}
        >
          {vBoard[0][0]}
        </span>
        <span
          className={`gameCells ${winnerCombination.some(comb => comb[0] === 0 && comb[1] === 1) ? 'winner' : ''}`}
          data-value="0.1"
          onClick={(el) => handleCellClick(el.target)}
        >
          {vBoard[0][1]}
        </span>
        <span
          className={`gameCells ${winnerCombination.some(comb => comb[0] === 0 && comb[1] === 2) ? 'winner' : ''}`}
          data-value="0.2"
          onClick={(el) => handleCellClick(el.target)}
        >
          {vBoard[0][2]}
        </span>
        <span
          className={`gameCells ${winnerCombination.some(comb => comb[0] === 1 && comb[1] === 0) ? 'winner' : ''}`}
          data-value="1.0"
          onClick={(el) => handleCellClick(el.target)}
        >
          {vBoard[1][0]}
        </span>
        <span
          className={`gameCells ${winnerCombination.some(comb => comb[0] === 1 && comb[1] === 1) ? 'winner' : ''}`}
          data-value="1.1"
          onClick={(el) => handleCellClick(el.target)}>
          {vBoard[1][1]}
        </span>
        <span
          className={`gameCells ${winnerCombination.some(comb => comb[0] === 1 && comb[1] === 2) ? 'winner' : ''}`}
          data-value="1.2"
          onClick={(el) => handleCellClick(el.target)}>
          {vBoard[1][2]}
        </span>
        <span
          className={`gameCells ${winnerCombination.some(comb => comb[0] === 2 && comb[1] === 0) ? 'winner' : ''}`}
          data-value="2.0"
          onClick={(el) => handleCellClick(el.target)}>
          {vBoard[2][0]}
        </span>
        <span
          className={`gameCells ${winnerCombination.some(comb => comb[0] === 2 && comb[1] === 1) ? 'winner' : ''}`}
          data-value="2.1"
          onClick={(el) => handleCellClick(el.target)}>
          {vBoard[2][1]}
        </span>
        <span
          className={`gameCells ${winnerCombination.some(comb => comb[0] === 2 && comb[1] === 2) ? 'winner' : ''}`}
          data-value="2.2"
          onClick={(el) => handleCellClick(el.target)}>
          {vBoard[2][2]}
        </span>
      </div>
      <button style={{ color: "black" }} onClick={() => startGame()}>start game</button>
    </div>
  )
}