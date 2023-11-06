<script setup lang="ts">
import type { Pokemon } from '@/stores/pokemon'
import findFirstTypeColor from '../utilities/pokemon-type-colors'
import type { PropType } from 'vue'

const props = defineProps({
  pokemonsList: {
    type: Array as PropType<Pokemon[]>,
    required: true
  }
})
</script>

<template>
  <div class="grid grid-cols-2 gap-2 justify-between">
    <div
      v-for="(pokemon, i) in props.pokemonsList"
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
          <img :src="pokemon.sprites.front_default" :alt="pokemon.name" class="h-[100px] w-auto" />
        </div>
      </div>
    </div>
  </div>
</template>
