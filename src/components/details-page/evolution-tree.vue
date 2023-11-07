<script lang="ts" setup>
import { type PokemonEvolutionTree } from '@/stores/pokemon'
import { type PropType } from 'vue'
import evolutionTree from '@/components/details-page/evolution-tree.vue'

const props = defineProps({
  evolveTo: {
    type: Array as PropType<PokemonEvolutionTree[]>,
    required: true
  }
})
</script>
<template>
  <div class="flex flex-row items-center justify-center mt-2">
    <font-awesome-icon
      icon="fa-solid fa-caret-down"
      style="height: 17px; width: 17px; padding: 0; color: #777"
    />
  </div>
  <div class="flex flex-wrap justify-between">
    <div v-for="(pokemon, i) in props?.evolveTo" :key="i">
      <div>
        <router-link
          class="py-2 justify-center items-center flex flex-col"
          :to="{ name: 'pokemon-details', params: { id: pokemon?.id } }"
        >
          <img
            :src="pokemon?.sprites?.front_default"
            :alt="pokemon?.name"
            class="h-[100px] w-[100px]"
          />
          {{ pokemon?.name.slice(0, 1).toUpperCase() + pokemon?.name.slice(1) }}
        </router-link>
        <evolutionTree
          v-if="pokemon?.evolve_to && pokemon?.evolve_to?.length > 0"
          :evolveTo="pokemon?.evolve_to as PokemonEvolutionTree[]"
        />
      </div>
    </div>
  </div>
</template>
