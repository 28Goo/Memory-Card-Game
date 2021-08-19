import React, { useState, useEffect } from 'react'
import Header from './Components/Boilerplates/Header';
import { fetchPokemonData, fetchPokemonResults } from './Utils/Api-Calls'
import Pokemons from './Components/Pokemons';
import uniqid from 'uniqid';
import Instruction from './Components/Boilerplates/Instruction';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    fetchPokemonData()
    .then(pokemons => pokemons.results.forEach(pokemon => {
      fetchPokemonResults(pokemon)
      .then(pokemon => setPokemons(prevPokemons => {
        let name = pokemon.name;
        let img = pokemon.sprites.front_default;
        return([...prevPokemons,
          {
            key: uniqid(),
            name,
            img,
        }]);
      }));
    }));
  },[]);

  useEffect(() => {
    if (score > bestScore) setBestScore(prevBestScore => prevBestScore + 1)
  },[score, bestScore])

  const addScore = () => {
    setScore(prevScore => prevScore + 1);
  }

  const resetScore = () => {
    setScore(prevScore => prevScore = 0);
  }

  const addSelected = (e) => {
    const { pokemon } = e.target.dataset;
    setSelected(prevSelected => {
      return([
        ...prevSelected,
        pokemon,
      ]);
    });
  }

  const resetSelected = () => {
    setSelected([]);
  }

  const checkSelected = (e) => {
    const { textContent } = e.target;
    const result = selected.filter(item => item === textContent);
    if (result.length === 1) {
      resetScore();
      resetSelected();
    }
  }

  const shufflePokemons = (pokemons) => {
    let currentIndex = pokemons.length;
    
    while(currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [pokemons[currentIndex], pokemons[randomIndex]] = [
        pokemons[randomIndex], pokemons[currentIndex]
      ];
    }
    return pokemons;
  }

  const onClick = (e) => {
    addSelected(e);
    addScore();
    checkSelected(e);
    shufflePokemons(pokemons);
  }
  
  return (
    <div className="App">
      <Header 
        score={score}
        bestScore={bestScore}
        />
      <Pokemons 
        pokemons={pokemons}
        select={onClick}
      />
      <Instruction />
    </div>
  );
}

export default App;
