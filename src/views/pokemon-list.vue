<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'
import { storeToRefs } from 'pinia'
import findFirstTypeColor from '../utilities/pokemon-type-colors'

const pokemonStore = usePokemonStore()
const { pokemonsList } = storeToRefs(pokemonStore)

onMounted(async () => {
  loading.value = true
  await pokemonStore.fetchPokemonsList(10, 0)
  loading.value = false
  window.addEventListener('scroll', debounce(handleScroll, 500))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const loading = ref(false)

const lazyLoadPokemons = async () => {
  loading.value = true
  await pokemonStore.fetchPokemonsList(10, pokemonsList.value.length)
  loading.value = false
}

// Debounce function to limit the frequency of calls
const debounce = (func: Function, delay: number) => {
  loading.value = true
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// for infinite scroll
const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY
  const clientHeight = window.innerHeight

  if (scrollTop + clientHeight >= scrollHeight - 200) {
    lazyLoadPokemons()
  }
}

const searchPokemon = ref('')
const searchPokemonByName = async () => {
  loading.value = true
  const result = await pokemonStore.searchPokemonByName(searchPokemon.value.toLowerCase())
  console.log(result)
  if (result.error) {
    alert('There are no pokemon with that name. Please enter exact name.')
  } else {
    alert('Pokemon found!')
  }
  loading.value = false
}
</script>

<template>
  <div class="p-4 text-gray-700">
    <div class="flex flex-row justify-between my-2 items-center">
      <div>
        <router-link to="/">
          <font-awesome-icon
            icon="fa-solid fa-arrow-left"
            style="height: 17px; width: 17px; padding: 0"
          />
        </router-link>
      </div>
      <div class="flex flex-row items-center px-4">
        <input
          v-model="searchPokemon"
          class="inputSearch"
          @keydown.enter="searchPokemonByName"
          placeholder="search by name..."
        />
      </div>
    </div>
    <div class="my-5 font-semibold"><h2>Pokédex</h2></div>
    <div class="grid grid-cols-2 gap-2 justify-between">
      <div
        v-for="(pokemon, i) in pokemonsList"
        :key="i"
        :style="{ backgroundColor: findFirstTypeColor(pokemon.types) }"
        class="col-span-1 rounded-lg shadow-md text-white flex flex-col justify-between overflow-hidden"
      >
        <div class="font-bold text-lg px-4 pt-4">
          {{ pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1).toLowerCase() }}
        </div>
        <div>
          <div class="flex flex-col justify-between gap-2 z-100 absolute p-4">
            <span
              v-for="(type, i) in pokemon.types"
              :key="i"
              :style="{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }"
              class="px-2 py-1 rounded-lg text-xs"
            >
              {{ type.type.name.slice(0, 1).toUpperCase() + type.type.name.slice(1).toLowerCase() }}
            </span>
          </div>
          <div class="flex flex-row justify-end">
            <img
              :src="pokemon.sprites.front_default"
              :alt="pokemon.name"
              class="h-[100px] w-auto"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="my-2 flex justify-center">Fetching pokémon...</div>
  </div>
</template>

<style scoped>
.inputSearch {
  outline: none;
  border: 1px solid gray;
  padding: 5px;
  border-radius: 5px;
}
.inputSearch:focus {
  outline: none;
  border: 1px solid gray;
  padding: 5px;
  border-radius: 5px;
}
</style>
