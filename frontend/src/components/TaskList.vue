<template>
  <v-container>
    <v-toolbar class="elevation-1 rounded-xl px-10 mt-5">
      <span class="text-h6 text-grey">Lista de tareas.</span>
      <v-spacer></v-spacer>
      <v-btn class="text-capitalize" color="deep-purple-accent-1" @click="isAddDialogOpen = true">
        <v-icon class="mr-2">mdi-plus</v-icon>
        Crear Tarea
      </v-btn>
    </v-toolbar>
  </v-container>
  <v-container class="task-list">
    <v-card
      @click="toggleStatus(task)"
      class="elevation-1 task-list-item px-4 py-8 rounded-xl d-flex flex-column"
      v-for="task in tasks"
      :key="task._id"
    >
      <v-card-actions>
        <span class="text-overline text-grey"> {{ task.status }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="toggleStatus(task)" :color="task.status === 'completada' ? 'green' : 'white'">
          <v-icon>{{ task.status === 'completada' ? 'mdi-check' : 'mdi-clock' }}</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="openDeleteDialog(task)">
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

  <!-- Diálogo para agregar una nueva tarea -->
  <v-dialog v-model="isAddDialogOpen" max-width="500">
    <v-card class="rounded-xl px-4 py-8">
      <v-card-title class="text-overline text-capitalize text-center">Agregar nueva tarea</v-card-title>
      <v-card-text>
        <TaskForm @task-added="addTask" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="isAddDialogOpen = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Diálogo de confirmación para eliminar -->
  <v-dialog v-model="isDialogOpen" max-width="500">
    <v-card>
      <v-card-title class="text-h6">Confirmar eliminación</v-card-title>
      <v-card-text>
        ¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="isDialogOpen = false">Cancelar</v-btn>
        <v-btn color="red" text @click="confirmDelete">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import TaskForm from '@/components/TaskForm.vue'
import apiClient from '../services/axios' // Importa la instancia de Axios

const tasks = ref([])
const isDialogOpen = ref(false) // Controla la visibilidad del diálogo de eliminación
const isAddDialogOpen = ref(false) // Controla la visibilidad del diálogo para agregar tareas
const taskToDelete = ref(null) // Almacena la tarea que se va a eliminar

// Función para abrir el diálogo de confirmación
const openDeleteDialog = (task) => {
  taskToDelete.value = task
  isDialogOpen.value = true
}

// Función para confirmar la eliminación
const confirmDelete = async () => {
  try {
    await apiClient.delete(`/tasks/${taskToDelete.value._id}`) // Usa la instancia de Axios
    tasks.value = tasks.value.filter((task) => task._id !== taskToDelete.value._id)
    isDialogOpen.value = false
    taskToDelete.value = null
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

// Función para agregar una nueva tarea
const addTask = (newTask) => {
  if (newTask && newTask._id) {
    tasks.value.unshift(newTask) // Agrega la nueva tarea al inicio de la lista
    isAddDialogOpen.value = false
  } else {
    console.error('La tarea creada no tiene un ID válido:', newTask)
  }
}

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