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
