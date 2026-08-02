# Sistema de Turnos y Reservas - Backend

## Descripción

Este proyecto implementa una API REST para la gestión de servicios y reservas utilizando Node.js, Express, módulos ES (ESM), dotenv y persistencia de datos mediante archivos JSON.

La aplicación permite administrar servicios mediante operaciones CRUD y gestionar reservas, asociando servicios a cada reserva.

La API está organizada mediante una arquitectura modular separando responsabilidades entre **routers, controllers y managers**:

- Los **routers** definen los endpoints disponibles.
- Los **controllers** reciben las peticiones HTTP, ejecutan la lógica correspondiente y generan las respuestas.
- Los **managers** contienen la lógica de negocio y el acceso a los archivos JSON.

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
│
├── controllers/
│   ├── services.controller.js
│   └── bookings.controller.js
│
├── data/
│   ├── services.json
│   └── bookings.json
│
├── managers/
│   ├── ServiceManager.js
│   ├── BookingManager.js
│   └── index.js
│
├── routes/
│   ├── services.router.js
│   └── booking.router.js
│
└── app.js
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
Manager
   |
   ▼
Archivo JSON
```

Cada capa tiene una responsabilidad específica:

- Los routers gestionan las rutas disponibles.
- Los controllers manejan las solicitudes y respuestas HTTP.
- Los managers administran la lógica de datos y persistencia.

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

## Obtener todos los servicios

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

Los servicios asociados se almacenan de la siguiente forma:

```json
{
  "service": 2,
  "quantity": 1
}
```

Si un servicio ya existe dentro de la reserva, se incrementa automáticamente el campo `quantity`.

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

## Agregar un servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

Si el servicio ya existe dentro de la reserva, se incrementa automáticamente su cantidad.

---

# Controllers

Los controllers contienen la lógica relacionada con las peticiones HTTP.

## Services Controller

Métodos principales:

```js
getServices()
```

```js
getServiceById()
```

```js
addService()
```

```js
updateService()
```

```js
deleteService()
```

---

## Bookings Controller

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

# Managers

Los managers contienen la lógica de negocio, validaciones y persistencia mediante archivos JSON.

---

## ServiceManager

Métodos principales:

```js
getServices(category, available)
```

```js
getServiceById(id)
```

```js
addService(service)
```

```js
updateService(id, updatedService)
```

```js
deleteService(id)
```

---

## BookingManager

Métodos principales:

```js
createBooking(bookingData)
```

```js
getBookingById(id)
```

```js
addServiceToBooking(bookingId, serviceId)
```

---

# Características implementadas

- CRUD completo de servicios.
- Gestión de reservas.
- Persistencia mediante archivos JSON utilizando `fs/promises`.
- IDs generados automáticamente.
- Validación de datos.
- Manejo de errores HTTP (400, 404 y 500).
- Uso de `req.params`, `req.query` y `req.body`.
- Organización mediante Express Router.
- Separación de responsabilidades utilizando routers, controllers y managers.
- Configuración mediante variables de entorno con dotenv.