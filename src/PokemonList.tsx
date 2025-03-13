import { useEffect, useState } from "react";
import { useFetch } from "./use-fetch";
import useElementOnScreen from "./use-element-on-screen";

type Pokemon = {
  name: string;
};

const LIMIT = 12;

const PokemonList = () => {
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { data, isLoading, error } = useFetch<{ results: Pokemon[] }>(
    `https://pokeapi.co/api/v2/pokemon?${new URLSearchParams({
      limit: `${LIMIT}`,
      offset: `${offset}`,
    })}`
  );
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  useEffect(() => {
    if (data && data.results) {
      if (offset > 0) {
        setPokemons((prev) => [...prev, ...data.results]);
      } else {
        setPokemons(data.results);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (isVisible) {
      setOffset(offset + LIMIT);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ol>
      <div className="container">
        {pokemons.map((pokemon, index) => (
          <div className="list-item" key={`${pokemon.name}-${index}`}>
            <span className="pkm-name">{pokemon.name}</span>
            <li>
              
              <img
                className="pkm-img"
                alt={pokemon.name}
                src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}
              />
            </li>
          </div>
        ))}
      </div>
      <div className="scrollable" ref={containerRef}></div>
    </ol>
  );
};

export default PokemonList;
