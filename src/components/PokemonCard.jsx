import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import { fetchSelectedPokemon } from '../slices/pokemonsSlice';
import { useDispatch } from 'react-redux';

const PokemonCard = ({ pokemonName,pokemonId  }) => {
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

  const handlePokemonClick = () => {
    dispatch(fetchSelectedPokemon(pokemonId));
  };
    

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => {
                setPokemonDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(`Error fetching details for Pokémon ${pokemonName}:`, error);
                setLoading(false);
            });
    }, [pokemonName]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={pokemonDetails?.sprites?.front_default} alt={pokemonName} />
                <Card.Body>
                    <Card.Title>{pokemonName}</Card.Title>
                    <Card.Text>Type: {pokemonDetails?.types?.map(type => type.type.name).join(', ')}</Card.Text>
                    <Button variant="primary" onClick={handleShowModal}>Afficher détails</Button>
                    <Button variant="success" onClick={handlePokemonClick}>Ajouter Pokemon</Button>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{pokemonName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <ListGroupItem>Loading...</ListGroupItem>
                    ) : (
                        // Affichage des détails du Pokémon dans une carte
                        <Card>
                            <Row>
                                {/* Colonne pour l'image du Pokémon */}
                                <Col xs={12} md={6}>
                                    <Card.Img src={pokemonDetails?.sprites?.front_default} alt={pokemonName} />
                                </Col>
                                {/* Colonne pour les informations du Pokémon */}
                                <Col xs={12} md={6}>
                                    <Card.Body>
                                        <Card.Title>{pokemonName}</Card.Title>
                                        <Card.Text>
                                            <ListGroupItem>Taille: {pokemonDetails.height}</ListGroupItem>
                                            <ListGroupItem>Poids: {pokemonDetails.weight}</ListGroupItem>
                                            <ListGroupItem>Puissance: {pokemonDetails.stats[0].base_stat}</ListGroupItem>
                                            <ListGroupItem>Catégorie: {pokemonDetails.types[0].type.name}</ListGroupItem>
                                            {/* Affichage des attaques sous forme de liste */}
                                            <ListGroupItem>Attaques:</ListGroupItem>
                                            <ListGroup>
                                                {pokemonDetails.moves.slice(0, 4).map((move, index) => (
                                                    <ListGroup.Item key={index}>{move.move.name}</ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Card.Text>
                                    </Card.Body>

                                </Col>
                            </Row>
                        </Card>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PokemonCard;
