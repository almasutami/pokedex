<script setup lang="ts">
import pikachu from '@/assets/pikachu.png'
import pokeball from '@/assets/pokeball.png'
</script>

<template>
  <div
    class="fade bg-gradient-to-b from-white to-gray-100 h-[100vh] w-full p-4 flex flex-col gap-2 justify-between text-gray-700"
  >
    <div class="flex justify-center items-center py-4 mt-5">
      <h1 :style="{ 'letter-spacing': '3px' }">POKÉDEX</h1>
    </div>
    <div class="flex justify-center items-center py-4 mt-5">
      <div>
        <router-link to="/pokemon-list" class="flex flex-col items-center gap-1">
          <img :src="pokeball" :class="'pokeball'" alt="pokeball" class="h-[50px] w-[50px]"
        /></router-link>
      </div>
    </div>
    <div class="flex flex-col gap-1 justify-center items-center mb-5">
      <img :src="pikachu" alt="pikachu" class="h-[250px] w-[250px]" />
      <div>Click pokéball to explore!</div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.pokeball {
  animation: spin 8s linear infinite;
}
</style>
