import React from 'react';
import { Container } from 'react-bootstrap';

const Layout = ({ totalPokemon, onClearPokedex, onShowPokedex, children }) => {
  
  const handleClearPokedex = () => {
    // Mettez ici la logique pour vider le Pokédex
    // Par exemple :
    console.log("Pokédex vidé !");
    onClearPokedex();
  };

  const handleShowPokedex = () => {
    // Mettez ici la logique pour afficher le Pokédex
    // Par exemple :
    console.log("Affichage du Pokédex !");
    onShowPokedex();
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="Pokémon Logo" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="title text-center">
                <h1>Mon Pokédex</h1>
                <p>{totalPokemon} Pokémon dans le Pokédex</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="actions text-end">
                <a href="https://www.pokemon.com/fr/" className="btn btn-primary">Accueil Pokémon</a>
                {/* <button className="btn btn-danger" onClick={handleClearPokedex}>Vider le Pokédex</button>
                <button className="btn btn-success" onClick={handleShowPokedex}>Afficher le Pokédex</button> */}
              </div>
            </div>
          </div>
        </div>
      </header>
      <Container>
        {children}
      </Container>
    </>
  );
};

export default Layout;
