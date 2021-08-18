import React from 'react'

export default function Score({score, bestScore}) {
    return(
        <div className="scoreContainer">
            <span className='score'>Current Score: {score}</span>
            <span className="bestScore">Best Score: {bestScore}</span>
        </div>
    )
}