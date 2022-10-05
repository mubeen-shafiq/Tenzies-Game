import React from "react"
import Die from "./Components/Die"
import "./styles.css"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App(){
    const [dice, setDice] = React.useState(allNewDice())
    
    function generateNewDice(){
        return(
            {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }
        )
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDice())
        }
        return newDice
    }
    
    function rollDice(){
        if(!tenzies){
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die: generateNewDice()
            }))
        }
        else{
            setDice(allNewDice())
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))

    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => firstValue === die.value)
        if (allHeld && allSameValue){
            setTenzies(true)
            console.log("You Won the game. Congrats!")
        }
        else{
            setTenzies(false)
        }
    },[dice])

    return(
        <main>
            {tenzies && <Confetti numberOfPieces={500} opacity={2.0}/>}
            <h1 className="title">Tenzies</h1>
            <p className="instruction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <div className="btn-container">
                <button className={tenzies ? "btn-new-game": "btn-roll"} onClick={rollDice}>{tenzies ? "New Game": "Roll"}</button>
            </div>
        </main>   

    )
}