const fetchPokemonResults = async (pokemon) => {
    let url = pokemon.url;
    const response = await fetch(url);
    return response.json();
}

const fetchPokemonData = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15');
    return response.json();
}

export { fetchPokemonData, fetchPokemonResults }