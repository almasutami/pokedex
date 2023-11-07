<script lang="ts" setup>
import StatLineBar from '@/components/stat-line-bar.vue'
import { usePokemonStore } from '@/stores/pokemon'
import { storeToRefs } from 'pinia'

const pokemonStore = usePokemonStore()
const { selectedPokemon } = storeToRefs(pokemonStore)
</script>

<template>
  <div class="py-2 flex flex-col gap-4 px-2">
    <StatLineBar
      label="HP"
      :value="selectedPokemon?.stats?.find((stat) => stat.stat.name === 'hp')?.base_stat"
    />
    <StatLineBar
      label="Attack"
      :value="selectedPokemon?.stats?.find((stat) => stat.stat.name === 'attack')?.base_stat"
    />
    <StatLineBar
      label="Defense"
      :value="selectedPokemon?.stats?.find((stat) => stat.stat.name === 'defense')?.base_stat"
    />
    <StatLineBar
      label="Special Attack"
      :value="
        selectedPokemon?.stats?.find((stat) => stat.stat.name === 'special-attack')?.base_stat
      "
    />
    <StatLineBar
      label="Special Defense"
      :value="
        selectedPokemon?.stats?.find((stat) => stat.stat.name === 'special-defense')?.base_stat
      "
    />
    <StatLineBar
      label="Speed"
      :value="selectedPokemon?.stats?.find((stat) => stat.stat.name === 'speed')?.base_stat"
    />
  </div>
</template>
