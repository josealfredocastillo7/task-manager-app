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

// Define el evento emitido
const emit = defineEmits(['task-added'])

const title = ref('')
const description = ref('')

const submitForm = async () => {
  try {
    const newTask = { title: title.value, description: description.value }
    const response = await apiClient.post('/tasks', newTask) // Usa la respuesta de la API
    title.value = ''
    description.value = ''
    emit('task-added', response.data) // Emite la tarea completa
  } catch (error) {
    console.error('Error creating task:', error)
  }
}
</script>