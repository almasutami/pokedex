<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'
import findFirstTypeColor from '@/utilities/pokemon-type-colors'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import detailsCard from '@/components/details-card.vue'
import sadpikachu from '@/assets/sadpikachu.png'

const pokemonStore = usePokemonStore()
const { selectedPokemon, selectedPokemonSpecies } = storeToRefs(pokemonStore)
const loading = ref(false)
const error = ref(false)

const pokemonId = useRoute().params.id as unknown as number

onMounted(async () => {
  loading.value = true
  const result = await pokemonStore.fetchPokemonDetails(pokemonId)
  const resultSpecies = await pokemonStore.fetchSpecies(pokemonId)
  const resultEvolution = await pokemonStore.fetchPokemonEvolution(
    selectedPokemonSpecies?.value?.evolution_chain?.url || ''
  )
  if (result?.error || resultSpecies?.error || resultEvolution?.error) {
    error.value = true
  }
  loading.value = false
})
</script>

<template>
  <div
    class="pt-4 h-[100vh]"
    :style="{
      backgroundColor: selectedPokemon?.types ? findFirstTypeColor(selectedPokemon?.types) : '#777'
    }"
    v-if="!error"
  >
    <div class="px-4 flex flex-row justify-start my-2 items-center">
      <router-link to="/pokemon">
        <font-awesome-icon
          icon="fa-solid fa-arrow-left"
          style="height: 17px; width: 17px; padding: 0; color: white"
        />
      </router-link>
    </div>
    <detailsCard />
    <div v-if="loading" class="my-2 flex justify-center">Fetching pokémon...</div>
  </div>
  <div v-if="error" class="flex flex-col justify-center gap-2 h-[100vh] items-center">
    Error in fetching pokémon...

    <img :src="sadpikachu" alt="pikachu" class="w-[100vw]" />
  </div>
</template>
