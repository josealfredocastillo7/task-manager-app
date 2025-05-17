# Task Manager App

Aplicación full stack para la gestión de tareas, desarrollada como parte de una prueba técnica. Permite crear, visualizar, actualizar y eliminar tareas, con persistencia en base de datos NoSQL. La arquitectura incluye un backend con Node.js + Express y un frontend en Vue.js.

---

## 🧠 Arquitectura de la solución

### Frontend
- **Framework:** Vue.js 3
- **Consumo de API REST** mediante `axios`
- **Componentes reutilizables:** `TaskItem`, `TaskForm`, entre otros
- **Estructura modular y limpia**, con separación por componentes y servicios

### Backend
- **Framework:** Express.js
- **Base de datos:** MongoDB Atlas (NoSQL en la nube)
- **API RESTful** con endpoints para operaciones CRUD sobre las tareas
- **Manejo de errores** y validaciones básicas

### Comunicación
- El frontend se comunica con el backend mediante HTTP (`axios`)
- Arquitectura cliente-servidor separada (repositorio monorepo con carpetas `backend/` y `frotend/`)

---

## ⚙️ Instrucciones de instalación y ejecución

### Requisitos
- Node.js ≥ 20
- MongoDB Atlas (o una instancia local)

### Clonar repositorio

```bash
git clone https://github.com/josealfredocastillo7/task-manager-app.git
cd task-manager-app

## Backlog Prioritario y Estimado

A continuación se detalla el backlog inicial del proyecto, con prioridad y tiempo estimado para cada tarea:

| Tarea                                 | Prioridad | Estimación |
|--------------------------------------|-----------|------------|
| Ver listado de tareas                | Alta      | 2 horas    |
| Crear tarea                          | Alta      | 1.5 horas  |
| Actualizar estado de tarea           | Alta      | 1 hora     |
| Eliminar tarea                       | Alta      | 1 hora     |
| API CRUD con Express y MongoDB       | Crítica   | 4 horas    |
| Manejo de errores en la API          | Media     | 1 hora     |
| Interfaz UI responsiva               | Media     | 2 horas    |
| Documentar entorno local             | Media     | 1 hora     |
| Buen uso de Git                      | Alta      | Continuo   |
| Preparar despliegue                  | Baja      | 1 hora     |

> Este backlog fue también incorporado en el [tablero de proyecto](https://github.com/josealfredocastillo7/task-manager-app/projects) de GitHub, siguiendo una estructura tipo kanban para facilitar el seguimiento.

