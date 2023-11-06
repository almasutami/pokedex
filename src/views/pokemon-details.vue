<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const pokemonStore = usePokemonStore()
const { selectedPokemon } = storeToRefs(pokemonStore)
const loading = ref(false)
const error = ref(false)

const pokemonId = useRoute().params.id as unknown as number

onMounted(async () => {
  loading.value = true
  console.log(pokemonId)
  const result = await pokemonStore.fetchPokemonDetails(pokemonId)
  if (result) {
    error.value = true
  }
  loading.value = false
})
</script>

<template>
  <div class="p-4 text-gray-700">
    <div class="flex flex-row justify-start my-2 items-center">
      <router-link to="/pokemon">
        <font-awesome-icon
          icon="fa-solid fa-arrow-left"
          style="height: 17px; width: 17px; padding: 0"
        />
      </router-link>
    </div>
    <div>{{ selectedPokemon?.name }}</div>
    <div v-if="loading" class="my-2 flex justify-center">Fetching pokémon...</div>
  </div>
  <div v-if="error">Pokemon not found!</div>
</template>
