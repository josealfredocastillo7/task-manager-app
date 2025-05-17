<template>
  <v-container>
    <v-list>
      <v-list-item
        v-for="task in tasks"
        :key="task._id"
        class="task-item"
      >
        <v-list-item-title>{{ task.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
        <v-list-item-action>
          <v-btn
            icon
            @click="toggleStatus(task)"
            :color="task.status === 'completada' ? 'green' : 'grey'"
          >
            <v-icon>{{ task.status === 'completada' ? 'mdi-check' : 'mdi-clock' }}</v-icon>
          </v-btn>
          <v-btn icon color="red" @click="deleteTask(task._id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import apiClient from '../services/axios' // Importa la instancia de Axios

const tasks = ref([])

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