<script lang="ts" setup>
import { usePokemonStore } from '@/stores/pokemon'
import { storeToRefs } from 'pinia'

const pokemonStore = usePokemonStore()
const { selectedPokemon, selectedPokemonSpecies } = storeToRefs(pokemonStore)
</script>
<template>
  <div class="py-2 flex flex-col gap-4 px-2">
    <div class="grid grid-cols-12 gap-2 overflow-auto">
      <div class="col-span-4 font-semibold">Generation</div>
      <div class="col-span-8">
        {{ selectedPokemonSpecies?.generation?.name }}
      </div>
    </div>
    <div class="grid grid-cols-12 gap-2 overflow-auto">
      <div class="col-span-4 font-semibold">Height</div>
      <div class="col-span-8">{{ selectedPokemon?.height }}</div>
    </div>
    <div class="grid grid-cols-12 gap-2 overflow-auto">
      <div class="col-span-4 font-semibold">Weight</div>
      <div class="col-span-8">{{ selectedPokemon?.height }}</div>
    </div>
    <div class="grid grid-cols-12 gap-2 overflow-auto">
      <div class="col-span-4 font-semibold">Ability</div>
      <div class="col-span-8">
        <div v-if="selectedPokemon?.abilities?.length" class="w-full">
          <span v-for="(ability, i) in selectedPokemon?.abilities" :key="i">
            {{
              ability.ability.name.slice(0, 1).toUpperCase() +
              ability.ability.name.slice(1).toLowerCase()
            }}{{ i < selectedPokemon?.abilities?.length - 1 ? `,&nbsp;` : '' }}
          </span>
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
        <div class="flex flex-row" v-if="selectedPokemonSpecies?.egg_groups?.length">
          <span v-for="(egg, i) in selectedPokemonSpecies?.egg_groups" :key="i">
            {{ egg?.name?.slice(0, 1).toUpperCase() + egg?.name?.slice(1).toLowerCase()
            }}{{ i < selectedPokemonSpecies?.egg_groups?.length - 1 ? `,&nbsp;` : '' }}
          </span>
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
