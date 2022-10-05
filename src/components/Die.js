import React from "react"

export default function Die(props){
//     const styles = {backgroundColor: props.isHeld ? "#59E391": "white"}
//     return(
//          <div className={props.isHeld === true ? "div-held-true" : "div-held-false"}> This is used when there is ternary on clasName. CSS is still available.

//         <div 
//             className="div-held" 
//             style={styles}
//             onClick = {props.holdDice} 
//         >
//             <h1 className= "dice-value">{props.value}</h1>
//         </div>
//     )
        const styles = {
            backgroundColor: props.isHeld ? "#59E391" : "white"
        }
        return (
            <div 
                className="div-held" 
                style={styles}
                onClick={props.holdDice}
            >
                <h2 className="dice-value">{props.value}</h2>
            </div>
        )
        }