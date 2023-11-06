import { defineStore } from 'pinia'
const API_URL = 'https://pokeapi.co/api/v2/'

export interface PalParkEncounterArea {
  base_score: number
  rate: number
  area: { name: string; url: string }
}
export interface FlavorText {
  flavor_text: string
  language: { name: string; url: string }
  version: { name: string; url: string }
}
export interface Description {
  description: string
  language: { name: string; url: string }
}
export interface Genus {
  genus: string
  language: { name: string; url: string }
}
export interface PokemonSpeciesVariety {
  is_default: boolean
  language: { name: string; url: string }
}

export interface PokemonSpeciesDexEntry {
  entry_number: number
  pokedex: { name: string; url: string }
}

export interface PokemonSpecies {
  id: number
  name: string
  order: number
  gender_rate: number
  capture_rate: number
  base_happiness: number
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  hatch_counter: number
  has_gender_differences: boolean
  forms_switchable: boolean
  pokedex_numbers: PokemonSpeciesDexEntry[]
  growth_rate: { name: string; url: string }
  egg_groups: { name: string; url: string }[]
  color: { name: string; url: string }
  shape: { name: string; url: string }
  evolves_from_species: { name: string; url: string }
  evolution_chain: { name: string; url: string }
  habitat: { name: string; url: string }
  generation: { name: string; url: string }
  names: { name: string; url: string }
  pal_park_encounters: PalParkEncounterArea[]
  flavor_text_entries: FlavorText[]
  form_descriptions: Description[]
  genera: Genus[]
  varieties: PokemonSpeciesVariety[]
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
  species: { name: string; url: string }
  stats: PokemonStat[]
  types: PokemonType[]
  url?: string
}

export interface PokemonExtended extends Pokemon {
  gender?: PokemonGender
}

export interface PokemonGender {
  id: number
  name: string
  pokemon_species_details: PokemonSpeciesGender[]
}

export interface PokemonSpeciesGender {
  rate: number
  pokemon_species: PokemonSpecies
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

export interface PokemonList {
  name: string
  url: string
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
  selectedPokemonSpecies: PokemonSpecies | null
}

export const usePokemonStore = defineStore('pokemon', {
  state: (): State => ({
    pokemonsList: [],
    totalPokemons: 0,
    selectedPokemon: null,
    selectedPokemonSpecies: null
  }),
  actions: {
    async fetchPokemonsList(take: number, skip: number) {
      const responsePokemonList = await fetch(`${API_URL}pokemon/?limit=${take}&offset=${skip}`)
      const resultPokemonList = await responsePokemonList.json()

      if (responsePokemonList.status !== 200) {
        return { data: null, error: 'error' }
      }

      const promises = resultPokemonList?.results?.map(async (pokemon: PokemonList) => {
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
      const responsePokemon = await fetch(`${API_URL}pokemon/${query}`)

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
      const responsePokemonDetails = await fetch(`${API_URL}pokemon/${id}`)

      if (responsePokemonDetails.status !== 200) {
        return { data: null, error: 'error' }
      }

      const resultPokemonDetails = await responsePokemonDetails.json()
      this.selectedPokemon = resultPokemonDetails
    },
    async fetchSpecies(id: number) {
      const responsePokemonSpecies = await fetch(`${API_URL}pokemon-species/${id}`)

      if (responsePokemonSpecies.status !== 200) {
        return { data: null, error: 'error' }
      }

      const resultPokemonSpecies = await responsePokemonSpecies.json()
      this.selectedPokemonSpecies = resultPokemonSpecies
    }
  },
  getters: {}
})
