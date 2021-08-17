import React, { useState, useEffect } from 'react'

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [selected, setSelected] = useState([]);
  const [count, setCount] = useState(0);

  const fetchPokemonResults = async (pokemon) => {
    let url = pokemon.url;
    const response = await fetch(url);
    return response.json();
  }

  const fetchPokemonData = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
    return response.json();
  }

  useEffect(() => {
    fetchPokemonData()
    .then(pokemons => pokemons.results.forEach(pokemon => {
      fetchPokemonResults(pokemon)
      .then(pokemon => setPokemons(prevPokemons => {
        return([
          ...prevPokemons,
          pokemon.name
        ]);
      }));
    }));
  },[]);

  const addCount = () => {
    setCount(prevCount => prevCount + 1);
  }

  const resetCount = () => {
    setCount(prevCount => prevCount = 0)
  }

  const addSelected = (e) => {
    const { textContent } = e.target;
    setSelected(prevSelected => {
      return([
        ...prevSelected,
        textContent
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
      resetCount();
      resetSelected();
    }
  }

  const shufflePokemons = (pokemons) => {
    let currentIndex = pokemons.length, randomIndex;
    
    while(currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [pokemons[currentIndex], pokemons[randomIndex]] = [
        pokemons[randomIndex], pokemons[currentIndex]
      ];
    }

    return pokemons;
  }

  const onClick = (e) => {
    addCount();
    addSelected(e);
    checkSelected(e);
    shufflePokemons(pokemons);
  }
  
  return (
    <div className="App">
      <h1>Count: {count}</h1>
      {
        pokemons.map(pokemon => {
          return(
            <div>
              <p onClick={onClick}>{pokemon}</p>
            </div>
          );
        })
      }
      <h1>Selected:</h1>
      {
        selected.map(item => {
          return( 
            <p>{item}</p>
          )
        })
      }
    </div>
  );
}

export default App;
