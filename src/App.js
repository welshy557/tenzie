import React from "react"
import Confetti from 'react-confetti'
import Dice from "./Dice"

export default function App() {
  
  const [diceValues, setDiceValues] = React.useState(resetDice())
  const [gameOver, setGameOver] = React.useState(false)

  // List of dice compenents
  const dice = diceValues.map(item => (
    <Dice id={item.id} key={item.id} rollNum={item.num} isGreen={item.isGreen} toggleGreen={toggleGreen}/>
  ))
  

  // Checks if game ends each time dice are rolled
  React.useEffect(() => {

    // Checks if all dice are green
    let allGreen = true
    for (let i = 0; i < diceValues.length; i++) {
      if (!diceValues[i].isGreen) {
          allGreen = false
      }
    }

    // Checks if all dice are white
    let allWhite = true
    for (let i = 0; i < diceValues.length; i++) {
      if (diceValues[i].isGreen) {
          allWhite = false
      }
    }

    // Checks if all dice are same value
    let allSame = true
    let first = diceValues[0].num
    for (let i = 0; i < diceValues.length; i++) {
      if (diceValues[i].num != first) {
          allSame = false
      }
    }

    // Checks if end game condition is met (all dice are green and same value)
    if (allGreen && allSame &&!gameOver) {
      setGameOver(prev => !prev)
    // Sets gameOver to false if game is reset
    } else if (allWhite && gameOver) {
      setGameOver(prev => !prev)
    }
  }, [diceValues])
  

  function resetDice() {
    const arry = [] // New array of dice objects

    // creates new dice objects and appends to new array of dice objects
    for (let i = 0; i < 10; i++) {
      let obj = {
        id: i,
        num: Math.floor(Math.random() * 6) + 1,
        isGreen: false
      }
      arry.push(obj)
    }
    
    return arry
  }


  function rollDice() {
    // Resets dice if game is over
    if (gameOver) {
      setDiceValues(resetDice())
    } else { // Rolls dice that are white, green dice stay the same.
        setDiceValues(prevDiceValues => prevDiceValues.map(dice => {
          return !dice.isGreen ? {...dice, num: Math.floor(Math.random() * 6) + 1} : dice
        }))
      }
  } 

  function toggleGreen(id) {
    setDiceValues(prevDiceValues => prevDiceValues.map(dice => {
      return id === dice.id ? {...dice, isGreen: !dice.isGreen} : dice
    }))
  }
  
  

  return (
  <div className="container">
      <div className="header--container">
        {gameOver && <Confetti class="confetti" width={Window.innerWidth} height={window.innerHeight}/> /*If game is over, render confetti*/}
        <div className="title">Tenzies</div>
        <div className="instructions">Roll until all dice are the same. Click each die to freeze it at it's current value between roles.</div>

        <div className="dice--container">{dice}</div>

        <button onClick={rollDice}>{!gameOver ? "Roll" : "Play Again"}</button>

      </div>
    </div>

  );
}

