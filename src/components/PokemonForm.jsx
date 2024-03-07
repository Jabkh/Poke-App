import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addPokemon } from "../slices/pokemonsSlice";

const PokemonForm = () => {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const imageRef = useRef();
  const typeRef = useRef();

  const addPokemonHandler = (e) => {
    e.preventDefault();

    const newPokemon = {
      name: nameRef.current.value,
      image: imageRef.current.value,
      type: typeRef.current.value,
    };

    dispatch(addPokemon(newPokemon));

    // Effacer les champs après l'ajout du Pokémon
    nameRef.current.value = "";
    imageRef.current.value = "";
    typeRef.current.value = "";
  };

  return (
    <>
      <input type="text" placeholder="Nom du Pokémon" ref={nameRef} />
      <input type="text" placeholder="URL de l'image" ref={imageRef} />
      <input type="text" placeholder="Type du Pokémon" ref={typeRef} />
      <button onClick={addPokemonHandler}>Ajouter Pokémon</button>
    </>
  );
};

export default PokemonForm;
