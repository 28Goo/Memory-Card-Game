import React from 'react'
import '../Styles/Pokemons.css'

export default function Pokemons({pokemons, select}) {
    return(
        <div className="pokemonContainer">
        {
            pokemons.map(pokemon => {
                return(
                    <div className="pokemon" key={pokemon.key} onClick={select} data-pokemon={pokemon.name}>
                        <img src={pokemon.img} alt={pokemon.name}/>
                        <span className="name">{pokemon.name}</span>
                    </div>
                )
            })
        }
    </div>
    )
}