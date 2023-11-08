<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import aboutPage from '@/components/details-page/about-page.vue'
import statsPage from '@/components/details-page/stats-page.vue'
import evolutionPage from '@/components/details-page/evolution-page.vue'
import movesPage from '@/components/details-page/moves-page.vue'
import correctImagePath from '@/utilities/correct-image-path'

const pokemonStore = usePokemonStore()
const { selectedPokemon } = storeToRefs(pokemonStore)

const displayPokemonId = (id: string) => {
  if (id === '') {
    return ''
  } else if (id.length === 1) {
    return `#00${id}`
  } else if (id.length === 2) {
    return `#0${id}`
  } else {
    return `#${id}`
  }
}

const selectedDetailsPage = ref(0)

const detailsPages = ref([
  {
    id: 0,
    name: 'About',
    active: true
  },
  {
    id: 1,
    name: 'Base Stats',
    active: false
  },
  {
    id: 2,
    name: 'Evolution',
    active: false
  },
  {
    id: 3,
    name: 'Moves',
    active: false
  }
])
</script>

<template>
  <div class="mt-3 text-white flex flex-col justify-between">
    <div class="px-4 flex flex-col">
      <div class="flex flex-row justify-between items-center">
        <div class="text-2xl font-semibold">
          {{
            selectedPokemon?.name
              ? selectedPokemon?.name?.slice(0, 1)?.toUpperCase() +
                selectedPokemon?.name?.slice(1)?.toLowerCase()
              : ''
          }}
        </div>
        <div class="px-4 text-lg font-bold" :style="{ 'letter-spacing': '3px' }">
          {{ displayPokemonId(selectedPokemon?.id?.toString() || '') }}
        </div>
      </div>
      <div class="flex flex-row justify-start gap-2 mt-3">
        <span
          v-for="(type, i) in selectedPokemon?.types"
          :key="i"
          :style="{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }"
          class="px-2 py-1 rounded-lg text-sm"
        >
          {{ type.type.name.slice(0, 1).toUpperCase() + type.type.name.slice(1).toLowerCase() }}
        </span>
      </div>
      <div class="flex flex-row justify-center items-center">
        <img
          :src="correctImagePath(selectedPokemon?.sprites.front_default || '')"
          :alt="selectedPokemon?.name"
          class="h-[200px] w-auto pokemon"
        />
      </div>
    </div>
    <div
      class="bg-white p-4 min-h-[60vh] text-gray-500"
      style="border-top-right-radius: 30px; border-top-left-radius: 30px"
    >
      <div class="my-5 flex flex-row justify-between">
        <div
          v-for="(page, i) in detailsPages"
          :key="i"
          :class="selectedDetailsPage === page?.id ? 'selected' : ''"
          @click="selectedDetailsPage = page?.id"
        >
          {{ page.name }}
        </div>
      </div>
      <aboutPage v-if="selectedDetailsPage === 0" />
      <statsPage v-if="selectedDetailsPage === 1" />
      <evolutionPage v-if="selectedDetailsPage === 2" />
      <movesPage v-if="selectedDetailsPage === 3" />
    </div>
  </div>
</template>

<style scoped>
.selected {
  border-bottom: 1px solid #000;
  padding-bottom: 3px;
  color: #000;
}
.pokemon {
  animation: moveUpDown 2s infinite alternate ease-in-out;
}

@keyframes moveUpDown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-5px);
  }
}
</style>
