<script setup>
import TopPage from "../components/TopPage.vue"
import History from "../components/History.vue"
</script>

<template>
  <div class="home">
    <v-app>
      <v-main class="text-deep-purple">
        <TopPage/>
        <History/>
      </v-main>
    </v-app>
  </div>
</template>
