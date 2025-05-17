<template>
  <v-main>
    <v-app-bar class="elevation-1" app>
      <template v-slot:prepend>
        <v-app-bar-nav-icon><v-icon>mdi-clipboard-multiple-outline</v-icon></v-app-bar-nav-icon>
      </template>
      <v-toolbar-title>Task Manager</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ isDarkTheme ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()
const isDarkTheme = computed(() => theme.global.name.value === 'dark')

const toggleTheme = () => {
  theme.global.name.value = isDarkTheme.value ? 'light' : 'dark'
}
</script>

<style>
.elevation-1 {
  box-shadow: 0 3px 8px rgba(34, 48, 62, 0.1), 0 0 transparent, 0 0 transparent !important;
}
</style>
