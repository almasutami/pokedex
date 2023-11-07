<script setup lang="ts">
import { getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'
import { storeToRefs } from 'pinia'
import listCard from '@/components/list-card.vue'
import pikachu from '@/assets/pikachu.png'

const instance = getCurrentInstance()
const pokemonStore = usePokemonStore()
const { pokemonsList } = storeToRefs(pokemonStore)

onMounted(async () => {
  loading.value = true
  pokemonsList.value = []
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

const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
      timeoutId = null
    }, delay)
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
    showErrorMessage('There are no pokémon with that name. Please enter exact pokémon name.')
  } else {
    openDetailsPage(result.data.id)
  }
  loading.value = false
}

const openDetailsPage = (pokemonId: number) => {
  instance?.proxy?.$router.push({ name: 'pokemon-details', params: { id: pokemonId } })
}

const showErrorMessageModal = ref(false)
const errorMessage = ref('')
const showErrorMessage = (message: string) => {
  showErrorMessageModal.value = true
  errorMessage.value = message
  setTimeout(() => {
    hideErrorMessageModal()
  }, 3000)
}
const hideErrorMessageModal = () => {
  showErrorMessageModal.value = false
}
</script>

<template>
  <div v-if="!loading" class="p-4 text-gray-700">
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
    <listCard :pokemonsList="pokemonsList" @openDetailsPage="openDetailsPage" />
    <div v-if="showErrorMessageModal" class="errorToast">
      {{ errorMessage }}
    </div>
  </div>
  <div v-if="loading" class="flex flex-col justify-center gap-2 h-[100vh] items-center">
    Fetching pokémon...
    <img :src="pikachu" alt="pikachu" class="w-[100vw]" />
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

.errorToast {
  position: fixed;
  top: 60px;
  left: 20%;
  right: 20%;
  background-color: #333;
  color: #fff;
  padding: 15px;
  font-size: 12px;
  border-radius: 5px;
  z-index: 999;
}
</style>
