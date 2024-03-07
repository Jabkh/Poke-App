import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Spinner } from 'react-bootstrap';
import PokemonCard from './PokemonCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonList } from '../slices/pokemonsSlice';


const PokemonList = () => {
  const dispatch = useDispatch();
  const { pokemonList, isLoading, error } = useSelector(state => state.pokemons);

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  return (
    <>
      <h2 className="text-center">Liste des Pokémon</h2>
      {/* Afficher le chargement ou les erreurs si nécessaire */}
      {isLoading ? (
        <Spinner animation="border" role="status" className="mx-auto">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : error ? (
        <div className="text-center mt-3">{error}</div>
      ) : (
        // Afficher la liste des Pokémon
        <Row xs={1} sm={2} md={4} lg={4} xl={4} className="g-4">
          {pokemonList.map((pokemon, index) => (
            <Col key={index}>
              <PokemonCard  pokemonName={pokemon.name} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default PokemonList;

