import React from 'react'
import Score from '../Score'
import '../../Styles/Header.css'

export default function Header({score, bestScore}) {
    return(
        <div className="header">
            <h1 className="logo">Poke-Memory Game</h1>
            <Score 
                score={score}
                bestScore={bestScore}
            />
        </div>
    )
}