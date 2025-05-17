<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="title"
        label="Título"
        required
      ></v-text-field>
      <v-textarea
        v-model="description"
        label="Descripción"
        required
      ></v-textarea>
      <v-btn type="submit" color="primary">Guardar</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import apiClient from '../services/axios' // Importa la instancia de Axios

const title = ref('')
const description = ref('')

const submitForm = async () => {
  try {
    await apiClient.post('/tasks', { title: title.value, description: description.value }) // Usa la instancia de Axios
    title.value = ''
    description.value = ''
    alert('Tarea creada con éxito')
  } catch (error) {
    console.error('Error creating task:', error)
  }
}
</script>