<script setup>
import TopPage from "../components/TopPage.vue"
import History from "../components/History.vue"
import Calendar from "../components/Calendar.vue"

</script>

<template>
  <div class="home">
    <v-app>
      <v-main class="text-deep-purple">
        <TopPage/>
        <History/>
        <Calendar/>
      </v-main>
    </v-app>
  </div>
</template>
