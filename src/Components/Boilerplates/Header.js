import React from 'react'
import Score from '../Score'
import '../../Styles/Header.css'

export default function Header({score, bestScore}) {
    return(
        <div className="header">
            <img className='logo' src="https://fontmeme.com/permalink/210819/d63932e388d58d8b6994373a23658b4a.png" alt="pokemon-font" border="0"/>
            <Score 
                score={score}
                bestScore={bestScore}
            />
        </div>
    )
}