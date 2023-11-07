<script lang="ts" setup>
import { usePokemonStore, type PokemonEvolutionTree } from '@/stores/pokemon'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import evolutionTree from '@/components/details-page/evolution-tree.vue'

const pokemonStore = usePokemonStore()
const { selectedPokemonEvolution } = storeToRefs(pokemonStore)

const pokemonEvolutionArray = ref<PokemonEvolutionTree | null>(null)

const displayPokemonEvolution = async () => {
  const secondLevel = selectedPokemonEvolution?.value?.chain?.evolves_to

  const firstLevelUrl = selectedPokemonEvolution?.value?.chain?.species?.url
    ? selectedPokemonEvolution?.value?.chain?.species?.url
    : ''
  const secondLevelUrl =
    selectedPokemonEvolution?.value?.chain?.evolves_to &&
    selectedPokemonEvolution?.value?.chain?.evolves_to?.length > 0
      ? selectedPokemonEvolution?.value?.chain?.evolves_to.map((secondLevel) => {
          return secondLevel?.species?.url
        })
      : []
  const thirdLevelUrl =
    secondLevel && secondLevel?.length > 0
      ? secondLevel?.map((secondLevel) => {
          return secondLevel?.evolves_to?.map((thirdLevel) => {
            return { url: thirdLevel?.species?.url, evolve_from_name: secondLevel?.species?.name }
          })
        })
      : []

  //fetch all first level pokemon in the chain
  const resultFirstLevel = await pokemonStore.fetchPokemonDetailsForEvolution(firstLevelUrl)
  if (resultFirstLevel?.error) {
    return
  }
  pokemonEvolutionArray.value = {
    ...resultFirstLevel.data,
    evolve_to: [],
    level: 1
  }

  //fetch all second level pokemon in the chain
  secondLevelUrl.map(async (secondLevelUrl: string) => {
    const resultSecondLevel = await pokemonStore.fetchPokemonDetailsForEvolution(secondLevelUrl)

    pokemonEvolutionArray.value?.evolve_to?.push({
      ...resultSecondLevel.data,
      evolve_to: [],
      level: 2
    })
  })

  //fetch all third level pokemon in the chain
  thirdLevelUrl.map(async (thirdLevelArray) => {
    thirdLevelArray.map(async (thirdLevelSecondArray) => {
      const resultThirdLevel = await pokemonStore.fetchPokemonDetailsForEvolution(
        thirdLevelSecondArray?.url
      )

      //find in second level
      pokemonEvolutionArray.value?.evolve_to?.forEach((secondLevel, i) => {
        if (secondLevel.name === thirdLevelSecondArray?.evolve_from_name) {
          pokemonEvolutionArray.value?.evolve_to?.[i]?.evolve_to?.push({
            ...resultThirdLevel.data,
            evolve_to: [],
            level: 3
          })
        }
      })
    })
  })
}
displayPokemonEvolution()
</script>
<template>
  <div class="py-2 flex flex-col gap-2 justify-center items-center">
    <div class="justify-center items-center flex flex-col">
      <img
        :src="pokemonEvolutionArray?.sprites?.front_default"
        :alt="pokemonEvolutionArray?.name"
        class="h-[100px] w-[100px]"
      />
      {{ pokemonEvolutionArray?.name }}
    </div>
    <evolutionTree
      v-if="pokemonEvolutionArray?.evolve_to && pokemonEvolutionArray?.evolve_to?.length > 0"
      :evolveTo="pokemonEvolutionArray?.evolve_to as PokemonEvolutionTree[]"
    />
  </div>
</template>
