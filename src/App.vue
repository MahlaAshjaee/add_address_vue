<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Headerr />
    <main class="flex-1 flex flex-col">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Headerr from "@/views/Headerr.vue";
</script>
