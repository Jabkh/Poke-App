import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPokemonDetails = createAsyncThunk(
  "pokemons/fetchPokemonDetails",
  async (pokemonName) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching details for Pokémon ${pokemonName}:`,
        error
      );
      throw error;
    }
  }
);

export const fetchPokemonList = createAsyncThunk(
  "pokemons/fetchPokemonList",
  async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=300"
      );
      return response.data.results;
    } catch (error) {
      throw Error("Erreur lors de la récupération de la liste des Pokémon.");
    }
  }
);

export const fetchSelectedPokemon = createAsyncThunk(
    "pokemons/fetchSelectedPokemon",
    async (pokemonId) => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        return response.data;
      } catch (error) {
        console.error(
          `Error fetching details for Pokémon with ID ${pokemonId}:`,
          error
        );
        throw error;
      }
    }
  );

  
const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState: {
    pokemonDetails: null,
    isLoading: false,
    isModalOpen: false,
    pokemonList: [],
    error: null,
    totalPokemonCount: 0,
    currentPage: 1,
    pageSize: 20,
    selectedPokemonDetails: null,
    selectedPokemonLoading: false,
  },
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setCurrentPage(state, action) {
        state.currentPage = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pokemonDetails = action.payload;
      })
      .addCase(fetchPokemonDetails.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPokemonList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pokemonList = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }).addCase(fetchSelectedPokemon.pending, (state) => {
        state.selectedPokemonLoading = true;
      })
      .addCase(fetchSelectedPokemon.fulfilled, (state, action) => {
        state.selectedPokemonLoading = false;
        state.selectedPokemonDetails = action.payload;
      })
      .addCase(fetchSelectedPokemon.rejected, (state) => {
        state.selectedPokemonLoading = false;
      });
  },
});

export const { openModal, closeModal,setCurrentPage } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
