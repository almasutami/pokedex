<script lang="ts" setup>
import { usePokemonStore, type PokemonMove } from '@/stores/pokemon'
import findFirstTypeColor from '@/utilities/pokemon-type-colors'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import pikachu from '@/assets/pikachu.png'

const pokemonStore = usePokemonStore()
const { selectedPokemon } = storeToRefs(pokemonStore)

const renderMoveName = (moveName: string) => {
  const name = moveName.slice(0, 1).toUpperCase() + moveName.slice(1)
  return name.split('-').join(' ')
}

const moves = ref<PokemonMove[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  selectedPokemon?.value?.moves.forEach(async (move) => {
    const result = await pokemonStore.fetchPokemonMove(move?.move?.url || '')
    if (!result?.error) {
      moves.value.push(result?.data)
    }
  })
  loading.value = false
})
</script>
<template>
  <div v-if="!loading" class="py-2 flex flex-col gap-4 px-2">
    <div
      v-for="(move, i) in moves"
      :key="i"
      class="p-4 rounded-md text-white"
      :style="{
        backgroundColor: selectedPokemon?.types
          ? findFirstTypeColor(selectedPokemon?.types)
          : '#777'
      }"
    >
      <div class="font-bold text-lg">{{ renderMoveName(move?.name) }}</div>
      <div class="text-sm my-2" v-if="move?.effect_entries?.[0]?.effect">
        <div v-if="move?.effect_entries?.[0]?.short_effect?.toString().includes('$effect_chance%')">
          {{
            move?.effect_entries?.[0]?.short_effect
              ?.toString()
              .replace('$effect_chance%', `${move?.effect_chance}%`)
          }}
        </div>
        <div v-else>{{ move?.effect_entries?.[0]?.short_effect }}</div>
      </div>
      <div class="flex flex-col text-xs">
        <div class="grid grid-cols-12" v-if="move?.power">
          <div class="col-span-5 font-semibold">Power</div>
          <div class="col-span-7">{{ move?.power }}</div>
        </div>
        <div class="grid grid-cols-12" v-if="move?.accuracy">
          <div class="col-span-5 font-semibold">Accuracy</div>
          <div class="col-span-7">{{ move?.accuracy }}%</div>
        </div>
        <div class="grid grid-cols-12" v-if="move?.damage_class">
          <div class="col-span-5 font-semibold">Damage class</div>
          <div class="col-span-7">
            {{
              move?.damage_class?.name.slice(0, 1).toUpperCase() + move?.damage_class?.name.slice(1)
            }}
          </div>
        </div>
        <div class="grid grid-cols-12" v-if="move?.contest_type?.name">
          <div class="col-span-5 font-semibold">Contest type</div>
          <div class="col-span-7">
            {{
              move?.contest_type?.name.slice(0, 1).toUpperCase() + move?.contest_type?.name.slice(1)
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="loading" class="flex flex-col justify-center gap-2 h-[100vh] items-center">
    Fetching pokémon...
    <img :src="pikachu" alt="pikachu" class="w-[100vw]" />
  </div>
</template>
