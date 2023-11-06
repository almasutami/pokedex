<script setup lang="ts">
import './assets/main.css'
</script>

<template>
  <div id="app" class="max-w-[700px]">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#app {
  margin: 0 auto;
}
</style>
