<script lang="ts" setup>
import { usePokemonStore, type PokemonAbility } from '@/stores/pokemon'
import { storeToRefs } from 'pinia'

const pokemonStore = usePokemonStore()
const { selectedPokemon, selectedPokemonSpecies } = storeToRefs(pokemonStore)

const displayHeight = (height: number) => {
  const feet = height * 0.328084
  const left = feet - Math.floor(feet)
  const inches = left * 3.937008
  const feetAndInches = `${Math.floor(feet)}' ${inches.toFixed(1)}"`
  return `${feetAndInches} (${height * 10} cm)`
}

const displayWeight = (weight: number) => {
  const lbs = weight * 0.220462
  return `${lbs.toFixed(2)}lbs (${weight / 10} kg)`
}

const displayGeneration = (generation: string) => {
  const split = generation.split('-')
  const first = split[0].slice(0, 1).toUpperCase() + split[0].slice(1).toLowerCase()
  const second = split[1].toUpperCase()
  const join = [first, second].join('-')
  return join
}

const displayAbility = (abilities: PokemonAbility[]) => {
  let abilitiesAsString = ``
  abilities.forEach((ability, i) => {
    const abilityName =
      ability.ability.name.slice(0, 1).toUpperCase() + ability.ability.name.slice(1).toLowerCase()
    abilitiesAsString =
      abilitiesAsString + `${abilityName}${i !== abilities.length - 1 ? ', ' : ''}`
  })
  return abilitiesAsString
}
const displayEggs = (eggs: { name: string; url: string }[]) => {
  let eggsAsString = ``
  eggs.forEach((egg, i) => {
    const eggName = egg.name.slice(0, 1).toUpperCase() + egg.name.slice(1).toLowerCase()
    eggsAsString = eggsAsString + `${eggName}${i !== eggs.length - 1 ? ', ' : ''}`
  })
  return eggsAsString
}
</script>

<template>
  <div class="py-2 flex flex-col gap-4 px-2">
    <div class="grid grid-cols-12 gap-2 overflow-auto">
      <div class="col-span-4 font-semibold">Generation</div>
      <div class="col-span-8">
        {{
          selectedPokemonSpecies?.generation?.name
            ? displayGeneration(selectedPokemonSpecies?.generation?.name)
            : ''
        }}
      </div>
    </div>
    <div class="grid grid-cols-12 gap-2 overflow-auto">
      <div class="col-span-4 font-semibold">Height</div>
      <div class="col-span-8">{{ displayHeight(selectedPokemon?.height || 0) }}</div>
    </div>
    <div class="grid grid-cols-12 gap-2 overflow-auto">
      <div class="col-span-4 font-semibold">Weight</div>
      <div class="col-span-8">{{ displayWeight(selectedPokemon?.weight || 0) }}</div>
    </div>
    <div class="grid grid-cols-12 gap-2 overflow-auto">
      <div class="col-span-4 font-semibold">Ability</div>
      <div class="col-span-8">
        <div v-if="selectedPokemon?.abilities?.length" class="w-full">
          <p>
            {{ displayAbility(selectedPokemon?.abilities) }}
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-2 overflow-auto">
      <div class="col-span-4 font-semibold">Capture rate</div>
      <div class="col-span-8">{{ selectedPokemonSpecies?.capture_rate }}</div>
    </div>

    <div class="grid grid-cols-12 gap-2 overflow-auto">
      <div class="col-span-4 font-semibold">Egg groups</div>
      <div class="col-span-8">
        <div class="w-full" v-if="selectedPokemonSpecies?.egg_groups?.length">
          <p>
            {{ displayEggs(selectedPokemonSpecies?.egg_groups) }}
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-2 overflow-auto">
      <div class="col-span-4 font-semibold">Gender rate</div>
      <div
        class="col-span-8 flex flex-row gap-2 items-center"
        v-if="selectedPokemonSpecies?.gender_rate && selectedPokemonSpecies?.gender_rate > 0"
      >
        <div class="flex flex-row gap-1 items-center">
          <font-awesome-icon
            icon="fa-solid fa-mars"
            style="height: 17px; width: 17px; padding: 0; color: navy"
          />{{ (1 - selectedPokemonSpecies?.gender_rate / 8) * 100 }} %
        </div>
        <div class="flex flex-row gap-1 items-center">
          <font-awesome-icon
            icon="fa-solid fa-venus"
            style="height: 17px; width: 17px; padding: 0; color: pink"
          />{{ (selectedPokemonSpecies?.gender_rate / 8) * 100 }}%
        </div>
      </div>
      <div v-else class="col-span-8 flex flex-row gap-2 items-center">Genderless</div>
    </div>
  </div>
</template>
