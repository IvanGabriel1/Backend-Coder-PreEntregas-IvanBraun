# Sistema de Turnos y Reservas - Backend

## Descripción

Este proyecto implementa una API REST para la gestión de servicios y reservas utilizando Node.js, Express, módulos ES (ESM), dotenv y persistencia de datos mediante archivos JSON.

La aplicación permite administrar servicios mediante operaciones CRUD y gestionar reservas, asociando uno o varios servicios a cada reserva.

## Tecnologías utilizadas

- Node.js
- Express
- dotenv
- ES Modules (ESM)
- fs/promises

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/IvanGabriel1/Backend-Coder-PreEntregas-IvanBraun.git
```

2. Entrar al proyecto

```bash
cd backend-turnos-reservas
```

3. Instalar dependencias

```bash
npm install
```

## Ejecución

Modo desarrollo:

```bash
npm run dev
```

El servidor se ejecutará en:

```
http://localhost:8080
```

## Variables de entorno

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
├── data/
│   ├── services.json
│   └── booking.json
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

## Endpoints

### Obtener todos los servicios

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

### Obtener servicio por ID

```http
GET /api/services/:sid
```

---

### Crear servicio

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

> El id se genera automáticamente.

---

### Actualizar servicio

```http
PUT /api/services/:sid
```

---

### Eliminar servicio

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

Si el mismo servicio se agrega nuevamente, únicamente se incrementa el campo `quantity`.

## Endpoints

### Crear reserva

```http
POST /api/bookings
```

Body:

```json
{
  "clientName": "Ivan Braun",
  "clientEmail": "ivan@gmail.com",
  "date": "2026-07-30",
  "time": "15:30",
  "status": "pendiente"
}
```

---

### Obtener reserva por ID

```http
GET /api/bookings/:bid
```

---

### Agregar un servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

Si el servicio ya existe dentro de la reserva, se incrementa automáticamente su cantidad.

---

# Managers

## ServiceManager

Gestiona la persistencia y operaciones sobre los servicios.

### Métodos

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

Gestiona las reservas y la asociación de servicios.

### Métodos

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
- Arquitectura separada en routers y managers.
- Configuración mediante variables de entorno (`dotenv`).