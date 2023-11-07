<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon'
import { storeToRefs } from 'pinia'
const props = defineProps(['label', 'value'])
const pokemonStore = usePokemonStore()
const { selectedPokemon } = storeToRefs(pokemonStore)
import findFirstTypeColor from '../utilities/pokemon-type-colors'
</script>

<template>
  <div class="grid grid-cols-12 gap-2 overflow-auto">
    <div class="col-span-4 font-semibold">{{ props.label }}</div>
    <div class="col-span-8">
      <div class="line-bar-container">
        <div
          class="line-bar"
          :style="{
            width: `${props.value / 2}%`,
            backgroundColor: selectedPokemon?.types
              ? findFirstTypeColor(selectedPokemon?.types)
              : '#777'
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-bar-container {
  width: 100%;
  height: 20px;
  background-color: #ddd;
  border-radius: 5px;
}

.line-bar {
  height: 100%;
  background-color: #4caf50;
  border-radius: 5px;
}
</style>
