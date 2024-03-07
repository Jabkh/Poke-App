import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice'; 
import pokemonReducer from './slices/pokemonsSlice'; 

const store = configureStore({
  reducer: {
    pokemons: pokemonReducer
  }
});

export default store;
