<template>
  <v-container>
    <v-toolbar class="elevation-1 rounded-xl px-10 mt-5">
      <span class="text-h6 text-grey">Lista de tareas completas y por hacer.</span>
      <v-spacer></v-spacer>
      <v-btn class="text-capitalize" color="deep-purple-accent-1" @click="$router.push('/create')">
        <v-icon class="mr-2">mdi-plus</v-icon>
        Crear Tarea
      </v-btn>
    </v-toolbar>
  </v-container>
  <v-container class="task-list">
    <v-card @click="toggleStatus(task)" class="elevation-1 task-list-item px-4 py-8 rounded-xl d-flex flex-column" v-for="task in tasks" :key="task._id">
      <v-card-actions>
        <span class="text-overline text-grey"> {{ task.status }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="toggleStatus(task)" :color="task.status === 'completada' ? 'green' : 'yellow-lighten-3'">
          <v-icon>{{ task.status === 'completada' ? 'mdi-check' : 'mdi-clock' }}</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="deleteTask(task._id)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
      <div class="px-4">
        <span class="text-h5">
          {{ task.title }}
        </span>
      </div>
      <v-card-text class="text-body-1 mt-1 mb-0 pb-0 text-grey-lighten-2">
        {{ task.description }}
      </v-card-text>
      <v-spacer class="flex-grow-1"></v-spacer> <!-- Espaciador flexible -->
      <v-card-actions class="mt-auto">
        <v-spacer></v-spacer>
        <span class="text-caption text-grey">
          {{ formatDate(task.createdAt) }}
        </span>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import apiClient from '../services/axios' // Importa la instancia de Axios

const tasks = ref([])

// Función para formatear la fecha
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateString))
}

const fetchTasks = async () => {
  try {
    const response = await apiClient.get('/tasks') // Usa la instancia de Axios
    tasks.value = response.data
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

const toggleStatus = async (task) => {
  try {
    const newStatus = task.status === 'pendiente' ? 'completada' : 'pendiente'
    await apiClient.patch(`/tasks/${task._id}`, { status: newStatus }) // Usa la instancia de Axios
    task.status = newStatus
  } catch (error) {
    console.error('Error updating task status:', error)
  }
}

const deleteTask = async (id) => {
  try {
    await apiClient.delete(`/tasks/${id}`) // Usa la instancia de Axios
    tasks.value = tasks.value.filter((task) => task._id !== id)
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

fetchTasks()
</script>

<style>
.task-list {
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); /* Ajusta dinámicamente */
  gap: 30px 16px;
}

.task-list-item {
  width: 100%; /* Se ajusta automáticamente al tamaño de la celda */
}
</style>