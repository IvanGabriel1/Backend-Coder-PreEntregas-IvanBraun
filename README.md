# Sistema de Turnos y Reservas - Backend

## Descripción

Este proyecto implementa una API REST para la gestión de servicios y reservas utilizando Node.js, Express, módulos ES (ESM), dotenv y persistencia de datos mediante archivos JSON.

La aplicación permite administrar servicios mediante operaciones CRUD y gestionar reservas asociando servicios a cada reserva.

La API está organizada mediante una arquitectura en capas separando responsabilidades entre:

- **Routers**
- **Controllers**
- **Services**
- **Repositories**
- **DAO**

Esta estructura permite mantener el código organizado, escalable y desacoplado de la fuente de persistencia.

---

# Tecnologías utilizadas

- Node.js
- Express
- dotenv
- ES Modules (ESM)
- fs/promises

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/IvanGabriel1/Backend-Coder-PreEntregas-IvanBraun.git
```

## 2. Entrar al proyecto

```bash
cd backend-turnos-reservas
```

## 3. Instalar dependencias

```bash
npm install
```

---

# Ejecución

Modo desarrollo:

```bash
npm run dev
```

El servidor se ejecutará en:

```
http://localhost:8080
```

---

# Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=8080
NODE_ENV=development
```

También se incluye un archivo `.env.example` como referencia.

---

# Estructura del proyecto

```
src/
│
├── config/
│   └── env.config.js
│   └── index.js
│
├── controllers/
│   ├── services.controller.js
│   └── bookings.controller.js
│
├── services/
│   ├── services.service.js
│   └── bookings.service.js
│
├── repositories/
│   ├── services.repository.js
│   └── bookings.repository.js
│
├── dao/
│   └── fileSystem/
│       ├── services.dao.js
│       └── bookings.dao.js
│
├── data/
│   ├── services.json
│   └── bookings.json
│
├── routes/
│   ├── services.router.js
│   └── bookings.router.js
│
├── app.js
└── server.js
```

---

# Arquitectura de la API

El flujo de una petición sigue la siguiente estructura:

```
Cliente
   |
   ▼
Router
   |
   ▼
Controller
   |
   ▼
Service
   |
   ▼
Repository
   |
   ▼
DAO
   |
   ▼
Archivo JSON
```

---

## Responsabilidad de cada capa

### Router

Define los endpoints disponibles y deriva cada petición al controller correspondiente.

---

### Controller

Se encarga de manejar la comunicación HTTP:

- Recibe `req.params`.
- Recibe `req.query`.
- Recibe `req.body`.
- Devuelve respuestas mediante `res`.

No contiene lógica de negocio ni acceso directo a datos.

---

### Service

Contiene la lógica de negocio de la aplicación:

- Validaciones.
- Reglas del sistema.
- Coordinación entre recursos.
- Preparación de datos antes de persistir.

Ejemplo:

Si un servicio ya existe dentro de una reserva, se incrementa automáticamente su cantidad.

---

### Repository

Funciona como intermediario entre los Services y los DAO.

Su responsabilidad es abstraer la fuente de datos permitiendo cambiar la persistencia sin modificar la lógica de negocio.

---

### DAO (Data Access Object)

Se encarga únicamente del acceso a los datos.

Actualmente utiliza archivos JSON mediante `fs/promises`.

---

# Configuración

El archivo:

```
src/config/index.js
```

se encarga de crear e inicializar las instancias necesarias:

- DAO.
- Repository.
- Services.

Permitiendo inyectar dependencias entre capas.

---

# Recurso: Services

Cada servicio posee la siguiente estructura:

```json
{
  "id": 1,
  "name": "Consulta médica",
  "description": "Consulta clínica general",
  "duration": 30,
  "price": 12000,
  "category": "Salud",
  "available": true
}
```

---

# Endpoints Services

## Obtener servicios

```http
GET /api/services
```

Permite filtrar mediante query params:

```http
GET /api/services?category=Salud
```

```http
GET /api/services?available=true
```

```http
GET /api/services?category=Salud&available=true
```

---

## Obtener servicio por ID

```http
GET /api/services/:sid
```

---

## Crear servicio

```http
POST /api/services
```

Body:

```json
{
  "name": "Masaje",
  "description": "Masaje relajante",
  "duration": 60,
  "price": 25000,
  "category": "Bienestar",
  "available": true
}
```

El ID se genera automáticamente.

---

## Actualizar servicio

```http
PUT /api/services/:sid
```

---

## Eliminar servicio

```http
DELETE /api/services/:sid
```

Un servicio no puede eliminarse si se encuentra asociado a una reserva activa.

---

# Recurso: Bookings

Cada reserva posee la siguiente estructura:

```json
{
  "id": 1,
  "clientName": "Ivan Braun",
  "clientEmail": "ivan@gmail.com",
  "date": "2026-07-30",
  "time": "15:30",
  "status": "pendiente",
  "services": []
}
```

Los servicios asociados se almacenan:

```json
{
  "service": 2,
  "quantity": 1
}
```

---

# Endpoints Bookings

## Crear reserva

```http
POST /api/bookings
```

---

## Obtener reserva por ID

```http
GET /api/bookings/:bid
```

---

## Agregar servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

Regla de negocio:

Si el mismo servicio se agrega nuevamente dentro de una reserva, se incrementa automáticamente el campo:

```json
quantity
```

Esta lógica se encuentra implementada en:

```
bookings.service.js
```

---

# Services principales

## Services Service

Métodos principales:

```js
getServices()
```

```js
getServiceById()
```

```js
createService()
```

```js
updateService()
```

```js
deleteService()
```

---

## Bookings Service

Métodos principales:

```js
createBooking()
```

```js
getBookingById()
```

```js
addServiceToBooking()
```

---

# Características implementadas

- CRUD completo de servicios.
- Gestión de reservas.
- Arquitectura en capas.
- Separación de responsabilidades.
- Persistencia mediante archivos JSON utilizando `fs/promises`.
- Inyección de dependencias mediante configuración centralizada.
- IDs generados automáticamente.
- Validación de datos.
- Manejo de errores HTTP (400, 404 y 500).
- Uso de `req.params`, `req.query` y `req.body`.
- Organización mediante Express Router.
- Reglas de negocio implementadas dentro de Services.
- Acceso a datos aislado mediante DAO.
- Repositories como capa intermedia entre lógica de negocio y persistencia.