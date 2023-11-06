import { defineStore } from 'pinia'
const API_URL = 'https://pokeapi.co/api/v2/pokemon'

export interface PokemonSpecies {
  name: string
  url: string
}

export interface Pokemon {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number
  abilities: PokemonAbility[]
  moves: PokemonMove[]
  sprites: PokemonSprites
  species: PokemonSpecies
  stats: PokemonStat[]
  types: PokemonType[]
}

export interface PokemonAbility {
  is_hidden: true
  slot: number
  ability: {
    name: string
    url: string
  }
}

export interface PokemonMoveVersion {
  level_learned_at: number
  move_learn_method: {
    name: string
    url: string
  }
  version_group: {
    name: string
    url: string
  }
}
export interface PokemonMove {
  move: {
    name: string
    url: string
  }
  version_group_details: PokemonMoveVersion[]
}

export interface PokemonStat {
  stat: { name: string; url: string }
  effort: number
  base_stat: number
}

export interface PokemonSprites {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

interface State {
  pokemonsList: Pokemon[]
  totalPokemons: number
  selectedPokemon: Pokemon | null
}

export const usePokemonStore = defineStore('pokemon', {
  state: (): State => ({
    pokemonsList: [],
    totalPokemons: 0,
    selectedPokemon: null
  }),
  actions: {
    async fetchPokemonsList(take: number, skip: number) {
      const responsePokemonList = await fetch(`${API_URL}/?limit=${take}&offset=${skip}`)
      const resultPokemonList = await responsePokemonList.json()

      if (responsePokemonList.status !== 200) {
        return { data: null, error: 'error' }
      }

      const promises = resultPokemonList?.results?.map(async (pokemon: PokemonSpecies) => {
        const responsePokemonDetails = await fetch(`${pokemon.url}`)
        const resultPokemonDetails = await responsePokemonDetails.json()

        const pokemonDetails = {
          species: pokemon,
          ...resultPokemonDetails
        }
        return pokemonDetails
      })

      const newPokemonList = await Promise.all(promises)
      this.pokemonsList = this.pokemonsList.concat(newPokemonList)

      this.totalPokemons = resultPokemonList.count
    },
    async searchPokemonByName(query: string) {
      const responsePokemon = await fetch(`${API_URL}/${query}`)

      if (responsePokemon.status !== 200) {
        return { data: null, error: 'error' }
      }

      const resultPokemon = await responsePokemon.json()
      if (!resultPokemon || !resultPokemon.id) {
        return { data: null, error: 'error' }
      }

      return { data: resultPokemon, error: null }
    },
    async fetchPokemonDetails(id: number) {
      const responsePokemonDetails = await fetch(`${API_URL}/${id}`)

      if (responsePokemonDetails.status !== 200) {
        return { data: null, error: 'error' }
      }

      const resultPokemonDetails = await responsePokemonDetails.json()
      this.selectedPokemon = resultPokemonDetails
    }
  },
  getters: {}
})
