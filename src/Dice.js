import React from "react"

export default function Dice({id, rollNum, isGreen, toggleGreen}) {
    
    const style = {
        backgroundColor: isGreen ? "#59E391": "white"
    }

    return (
        <div className="Dice" style={style} onClick={() => toggleGreen(id)}>{rollNum}</div>
    )
}