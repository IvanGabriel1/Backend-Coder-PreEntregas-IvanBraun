# Sistema de Turnos y Reservas - Backend

## Descripción

Este proyecto implementa una API REST para la gestión de servicios y reservas utilizando **Node.js, Express, Mongoose y MongoDB Atlas**.

La aplicación permite administrar servicios mediante operaciones CRUD y gestionar reservas asociando servicios a cada reserva.

En esta etapa se migró la persistencia de datos desde archivos JSON hacia **MongoDB Atlas**, utilizando **Mongoose** como ODM (Object Document Mapper).

La API mantiene los endpoints y el comportamiento externo de la etapa anterior, modificando únicamente la forma en que los datos son almacenados y consultados internamente.

La aplicación está organizada mediante una arquitectura en capas separando responsabilidades entre:

* **Routers**
* **Controllers**
* **Services**
* **Repositories**
* **DAO**
* **Models**

Esta estructura permite mantener el código organizado, escalable y desacoplado de la fuente de persistencia.

---

# Tecnologías utilizadas

* Node.js
* Express
* Mongoose
* MongoDB Atlas
* dotenv
* ES Modules (ESM)

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

```text
http://localhost:8080
```

---

# Variables de entorno

La aplicación utiliza variables de entorno para configurar el puerto, el entorno de ejecución y la conexión con MongoDB Atlas.

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<database>
```

También se incluye un archivo `.env.example` como referencia.

**No se debe subir el archivo `.env` al repositorio**, ya que puede contener credenciales sensibles.

---

# Estructura del proyecto

```text
src/
│
├── config/
│   ├── env.config.js
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
│   └── mongo/
│       ├── services.mongo.dao.js
│       └── bookings.mongo.dao.js
│
├── models/
│   ├── service.model.js
│   ├── booking.model.js
│   └── message.model.js
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

```text
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
Model de Mongoose
   |
   ▼
MongoDB Atlas
```

---

## Responsabilidad de cada capa

### Router

Define los endpoints disponibles y deriva cada petición al controller correspondiente.

---

### Controller

Se encarga de manejar la comunicación HTTP:

* Recibe `req.params`.
* Recibe `req.query`.
* Recibe `req.body`.
* Devuelve respuestas mediante `res`.

No contiene lógica de negocio ni acceso directo a MongoDB.

---

### Service

Contiene la lógica de negocio de la aplicación:

* Validaciones.
* Reglas del sistema.
* Coordinación entre recursos.
* Preparación de datos antes de persistir.

Por ejemplo, cuando un servicio se agrega nuevamente a una reserva, se incrementa su cantidad en lugar de crear una nueva entrada para el mismo servicio.

---

### Repository

Funciona como intermediario entre los Services y los DAO.

Su responsabilidad es abstraer el acceso a los datos, permitiendo que la lógica de negocio no dependa directamente de Mongoose.

---

### DAO (Data Access Object)

Se encarga exclusivamente del acceso a los datos mediante Mongoose.

Los DAO utilizan los modelos definidos en la carpeta `models` para realizar operaciones sobre MongoDB.

---

### Models

Los modelos definen los esquemas utilizados por Mongoose para representar los documentos almacenados en MongoDB.

Se implementaron los siguientes modelos:

* `service.model.js`
* `booking.model.js`
* `message.model.js`

---

# Configuración de MongoDB

La conexión con MongoDB Atlas se realiza mediante la variable de entorno:

```env
MONGO_URI
```

La aplicación utiliza Mongoose para establecer la conexión y realizar las operaciones de persistencia.

Los datos dejan de almacenarse en archivos JSON y pasan a almacenarse en colecciones de MongoDB.

Las principales colecciones utilizadas son:

```text
services
bookings
```

El modelo de mensajes también se encuentra definido mediante Mongoose:

```text
messages
```

---

# Modelo: Services

Los servicios se almacenan como documentos de MongoDB.

Ejemplo:

```json
{
  "_id": "68a123456789abcdef123456",
  "name": "Consulta médica",
  "description": "Consulta clínica general",
  "duration": 30,
  "price": 12000,
  "category": "Salud",
  "available": true
}
```

El campo `_id` es generado automáticamente por MongoDB y utiliza el tipo `ObjectId`.

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

El parámetro `sid` corresponde al `_id` generado por MongoDB.

Ejemplo:

```http
GET /api/services/68a123456789abcdef123456
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

El `_id` se genera automáticamente mediante MongoDB.

---

## Actualizar servicio

```http
PUT /api/services/:sid
```

Ejemplo de body:

```json
{
  "name": "Masaje relajante",
  "description": "Masaje corporal relajante",
  "duration": 60,
  "price": 28000,
  "category": "Bienestar",
  "available": true
}
```

---

## Eliminar servicio

```http
DELETE /api/services/:sid
```

Un servicio no puede eliminarse si se encuentra asociado a una reserva activa.

---

# Modelo: Bookings

Cada reserva se almacena como un documento de MongoDB.

Ejemplo:

```json
{
  "_id": "68a987654321abcdef654321",
  "clientName": "Ivan Braun",
  "clientEmail": "ivan@gmail.com",
  "date": "2026-07-30",
  "time": "15:30",
  "status": "pendiente",
  "services": []
}
```

El campo `_id` es generado automáticamente por MongoDB mediante `ObjectId`.

---

## Servicios asociados a una reserva

Los servicios asociados a una reserva se almacenan mediante referencias a documentos de la colección `services`.

La estructura utilizada es:

```json
{
  "service": "68a123456789abcdef123456",
  "quantity": 1
}
```

El campo `service` contiene el `ObjectId` correspondiente al servicio, en lugar de almacenar el objeto completo del servicio.

Esto permite mantener una relación entre las colecciones `bookings` y `services`.

---

# Endpoints Bookings

## Crear reserva

```http
POST /api/bookings
```

Ejemplo:

```json
{
  "clientName": "Ivan Braun",
  "clientEmail": "ivan@gmail.com",
  "date": "2026-07-30",
  "time": "15:30",
  "status": "pendiente",
  "services": []
}
```

---

## Obtener reserva por ID

```http
GET /api/bookings/:bid
```

El parámetro `bid` corresponde al `_id` generado por MongoDB.

Ejemplo:

```http
GET /api/bookings/68a987654321abcdef654321
```

---

## Agregar servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

Donde:

* `bid` corresponde al `_id` de la reserva.
* `sid` corresponde al `_id` del servicio.

Ejemplo:

```http
POST /api/bookings/68a987654321abcdef654321/services/68a123456789abcdef123456
```

### Regla de negocio

Si el mismo servicio se agrega nuevamente dentro de una reserva, se incrementa automáticamente el campo:

```json
{
  "quantity": 2
}
```

Esta lógica se encuentra implementada en:

```text
bookings.service.js
```

---

# Modelo: Messages

Se incluye un modelo de Mongoose para mensajes:

```text
models/message.model.js
```

El modelo contiene los siguientes campos:

```json
{
  "user": "Ivan",
  "message": "Quisiera consultar por un turno"
}
```

Además, utiliza `timestamps` para registrar automáticamente las fechas de creación y actualización.

En esta etapa no se implementan endpoints para `messages`, ya que la consigna mantiene como endpoints requeridos únicamente los correspondientes a `services` y `bookings`.

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

# Persistencia

La persistencia fue migrada desde:

```text
FileSystem → archivos JSON
```

hacia:

```text
MongoDB Atlas → Mongoose
```

Los DAO anteriores basados en `fs/promises` fueron reemplazados por DAO específicos para MongoDB.

Por ejemplo:

```js
ServiceModel.find()
```

```js
ServiceModel.findById(id)
```

```js
ServiceModel.create(data)
```

```js
ServiceModel.findByIdAndUpdate(id, data)
```

```js
ServiceModel.findByIdAndDelete(id)
```

---

# Características implementadas

* CRUD completo de servicios.
* Gestión de reservas.
* Arquitectura en capas.
* Separación de responsabilidades.
* Persistencia mediante MongoDB Atlas.
* Uso de Mongoose como ODM.
* Modelos de Mongoose para `services`, `bookings` y `messages`.
* Referencias entre reservas y servicios mediante `ObjectId`.
* Inyección de dependencias mediante configuración centralizada.
* IDs generados automáticamente por MongoDB.
* Validación de datos.
* Manejo de errores HTTP.
* Uso de `req.params`, `req.query` y `req.body`.
* Organización mediante Express Router.
* Reglas de negocio implementadas dentro de Services.
* Acceso a datos aislado mediante DAO.
* Repositories como capa intermedia entre lógica de negocio y persistencia.
* Variables de entorno para la conexión con MongoDB Atlas.

---

# Seguridad

El archivo `.env` contiene información sensible, como las credenciales y la URI de conexión a MongoDB Atlas.

Por este motivo:

* `.env` no debe subirse al repositorio.
* `node_modules` no debe subirse al repositorio.
* Se incluye `.env.example` como referencia para configurar el proyecto.

Ejemplo:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=
```

---

# Autor

**Ivan Braun**

Proyecto desarrollado como parte del curso de Backend.
