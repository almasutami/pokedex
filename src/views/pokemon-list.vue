<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'
import { storeToRefs } from 'pinia'
import listCard from '@/components/list-card.vue'

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
  if (result.error) {
    alert('There are no pokémon with that name. Please enter exact pokémon name.')
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
      <div class="flex flex-col gap-1 px-4">
        <input
          v-model="searchPokemon"
          class="inputSearch"
          @keydown.enter="searchPokemonByName"
          placeholder="search by name..."
        />
      </div>
    </div>
    <div class="my-5 font-semibold"><h2>Pokédex</h2></div>
    <listCard :pokemonsList="pokemonsList" />
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
