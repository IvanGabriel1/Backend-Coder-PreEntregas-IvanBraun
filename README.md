# Sistema de Turnos y Reservas - Backend

## Descripción

Este proyecto implementa una API REST para la gestión de servicios y reservas utilizando **Node.js, Express, Mongoose y MongoDB Atlas**.

La aplicación permite administrar servicios mediante operaciones CRUD y gestionar reservas asociando servicios a cada reserva.

Además de la API REST, el proyecto incorpora **vistas server-side con Handlebars** y **comunicación en tiempo real mediante Socket.IO**, manteniendo la API existente y la arquitectura en capas.

La persistencia de datos se realiza mediante **MongoDB Atlas**, utilizando **Mongoose** como ODM (Object Document Mapper).

La aplicación está organizada mediante una arquitectura en capas que separa responsabilidades entre:

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
* Express Handlebars
* Socket.IO
* Mongoose
* MongoDB Atlas
* Zod
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
│   ├── database.config.js
│   └── index.js
│
├── controllers/
│   ├── services.controller.js
│   ├── bookings.controller.js
│   └── views.controller.js
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
│   ├── services.model.js
│   ├── booking.model.js
│   └── message.model.js
│
├── schemas/
│   ├── services.schema.js
│   └── bookings.schema.js
│
├── routes/
│   ├── services.router.js
│   ├── booking.router.js
│   └── views.router.js
│
├── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── services.handlebars
│   └── bookings.handlebars
│
├── public/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── socket.js
│
├── app.js
└── server.js
```

---

# Arquitectura de la API

El flujo de una petición de la API REST sigue la siguiente estructura:

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

# Responsabilidad de cada capa

## Router

Define los endpoints disponibles y deriva cada petición al controller correspondiente.

---

## Controller

Se encarga de manejar la comunicación HTTP:

* Recibe `req.params`.
* Recibe `req.query`.
* Recibe `req.body`.
* Devuelve respuestas mediante `res`.

No contiene lógica de negocio ni acceso directo a MongoDB.

---

## Service

Contiene la lógica de negocio de la aplicación:

* Validaciones.
* Reglas del sistema.
* Coordinación entre recursos.
* Preparación de datos antes de persistir.

Por ejemplo, cuando un servicio se agrega nuevamente a una reserva, se incrementa su cantidad en lugar de crear una nueva entrada para el mismo servicio.

---

## Repository

Funciona como intermediario entre los Services y los DAO.

Su responsabilidad es abstraer el acceso a los datos, permitiendo que la lógica de negocio no dependa directamente de Mongoose.

---

## DAO (Data Access Object)

Se encarga exclusivamente del acceso a los datos mediante Mongoose.

Los DAO utilizan los modelos definidos en la carpeta `models` para realizar operaciones sobre MongoDB.

---

## Models

Los modelos definen los esquemas utilizados por Mongoose para representar los documentos almacenados en MongoDB.

Se implementaron los siguientes modelos:

* `services.model.js`
* `booking.model.js`
* `message.model.js`

---

# Validación de datos

Se utiliza **Zod** para validar los datos recibidos por la API antes de procesarlos.

Las validaciones se aplican principalmente sobre los datos recibidos mediante:

* `req.body`
* `req.params`

Se validan aspectos como:

* Campos obligatorios.
* Tipos de datos.
* Longitud de strings.
* Valores numéricos.
* Emails.
* Fechas.
* ObjectId válidos.
* Cantidades mayores a cero.

Para los identificadores de MongoDB se utiliza una validación mediante expresión regular para comprobar que tengan el formato correspondiente a un `ObjectId` de 24 caracteres hexadecimales.

Cuando los datos no cumplen con el esquema definido, la API responde con código HTTP `400` y devuelve los errores de validación.

Ejemplo:

```json
{
    "status": "error",
    "message": "Datos inválidos",
    "errors": [
        {
            "path": ["price"],
            "message": "El precio no puede ser negativo"
        }
    ]
}
```

---

# Vistas con Handlebars

Se incorporó **Express Handlebars** como motor de vistas server-side.

Las vistas utilizan los mismos Services, Repositories y DAO que la API REST, evitando duplicar la lógica de acceso a datos.

El flujo de una vista es:

```text
Navegador
   |
   ▼
Views Router
   |
   ▼
Views Controller
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
MongoDB Atlas
   |
   ▼
Views Controller
   |
   ▼
Handlebars
   |
   ▼
HTML
```

## Vista de servicios

```http
GET /views/services
```

Renderiza el listado de servicios almacenados en MongoDB.

La vista muestra:

* Nombre
* Descripción
* Duración
* Precio
* Categoría
* Disponibilidad

La información no está hardcodeada y es obtenida mediante la arquitectura en capas existente.

---

## Vista de reservas

```http
GET /views/bookings
```

Renderiza las reservas almacenadas en MongoDB.

La vista muestra información como:

* ID
* Cliente
* Email
* Fecha
* Hora
* Estado
* Servicios asociados
* Cantidad de cada servicio

---

# Layout principal

Las vistas utilizan un layout compartido:

```text
src/views/layouts/main.handlebars
```

El layout contiene la estructura HTML general, navegación y referencia a los archivos CSS.

Las vistas específicas se insertan mediante:

```handlebars
{{{body}}}
```

---

# Archivos públicos

Los archivos estáticos se encuentran dentro de:

```text
src/public/
```

La aplicación expone esta carpeta mediante Express.

## CSS

```text
src/public/css/styles.css
```

Contiene los estilos utilizados por las vistas.

## JavaScript

```text
src/public/js/socket.js
```

Contiene la lógica del cliente para la comunicación mediante Socket.IO.

---

# Comunicación en tiempo real con Socket.IO

Se incorporó **Socket.IO** para permitir actualizaciones en tiempo real sin necesidad de recargar la página.

La funcionalidad implementada consiste en **cambiar la disponibilidad de un servicio desde la vista de servicios**.

## Flujo

```text
Usuario
   |
   | Click en "Cambiar disponibilidad"
   ▼
socket.js
   |
   | socket.emit("change-availability")
   ▼
Socket.IO Server
   |
   ▼
ServicesService
   |
   ▼
Repository
   |
   ▼
DAO
   |
   ▼
MongoDB Atlas
```

Una vez actualizado el servicio en MongoDB, el servidor emite:

```js
io.emit("service-updated", updatedService);
```

Todos los clientes conectados reciben el evento.

```text
MongoDB
   |
   ▼
server.js
   |
   | service-updated
   ▼
socket.js
   |
   ▼
HTML actualizado
```

De esta manera, la disponibilidad del servicio cambia en el navegador **sin recargar la página**.

---

# Evento de Socket.IO

## Cliente → servidor

El cliente emite:

```js
socket.emit("change-availability", service);
```

El servidor recibe el evento:

```js
socket.on("change-availability", async (service) => {
    // actualización del servicio
});
```

---

## Servidor → clientes

Después de actualizar MongoDB:

```js
io.emit("service-updated", updatedService);
```

El cliente escucha:

```js
socket.on("service-updated", (service) => {
    // actualización de la vista
});
```

---

# API REST

La incorporación de Handlebars y Socket.IO **no reemplaza la API REST existente**.

Las rutas `/api/...` continúan funcionando de forma independiente.

---

# Endpoints Services

## Obtener servicios

```http
GET /api/services
```

Permite utilizar parámetros de consulta para filtrar, paginar y ordenar los resultados.

### Filtrar por categoría

```http
GET /api/services?category=Salud
```

### Filtrar por disponibilidad

```http
GET /api/services?available=true
```

### Combinar filtros

```http
GET /api/services?category=Salud&available=true
```

### Paginación

```http
GET /api/services?page=1&limit=10
```

### Ordenamiento

```http
GET /api/services?sortBy=price&order=desc
```

Los parámetros disponibles son:

* `category`
* `available`
* `page`
* `limit`
* `sortBy`
* `order`

La respuesta incluye información de paginación como:

* `total`
* `page`
* `limit`
* `totalPages`
* `hasPrevPage`
* `hasNextPage`

Ejemplo:

```json
{
    "status": "success",
    "payload": {
        "payload": [],
        "total": 2,
        "page": 1,
        "limit": 1,
        "totalPages": 2,
        "hasPrevPage": false,
        "hasNextPage": true
    }
}
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

Los datos son validados antes de crear el servicio.

---

## Actualizar servicio

```http
PUT /api/services/:sid
```

Ejemplo:

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

Los datos enviados son validados antes de realizar la actualización.

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

# Servicios asociados a una reserva

Los servicios asociados a una reserva se almacenan mediante referencias a documentos de la colección `services`.

La estructura utilizada es:

```json
{
    "service": "68a123456789abcdef123456",
    "quantity": 1
}
```

El campo `service` contiene el `ObjectId` correspondiente al servicio.

Esto permite mantener una relación entre las colecciones `bookings` y `services`.

Cuando se consulta una reserva por ID, los servicios pueden ser obtenidos mediante **Mongoose `populate`**, permitiendo devolver la información completa del servicio asociado.

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
    "services": [
        {
            "service": "68a123456789abcdef123456",
            "quantity": 1
        }
    ]
}
```

Los datos son validados mediante Zod antes de crear la reserva.

---

## Obtener todas las reservas

```http
GET /api/bookings
```

Devuelve las reservas almacenadas en MongoDB.

---

## Obtener reserva por ID

```http
GET /api/bookings/:bid
```

El parámetro `bid` corresponde al `_id` generado por MongoDB.

Los servicios asociados son obtenidos mediante `populate`.

---

## Agregar servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

Donde:

* `bid` corresponde al `_id` de la reserva.
* `sid` corresponde al `_id` del servicio.

Ambos parámetros son validados para comprobar que tengan un formato válido de `ObjectId`.

### Regla de negocio

Si el mismo servicio se agrega nuevamente dentro de una reserva, se incrementa automáticamente el campo:

```json
{
    "service": "68a123456789abcdef123456",
    "quantity": 2
}
```

Por ejemplo:

```text
Primera vez → quantity: 1
Segunda vez → quantity: 2
Tercera vez → quantity: 3
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

En esta etapa no se implementan endpoints para `messages`.

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
update()
```

```js
delete()
```

---

## Bookings Service

Métodos principales:

```js
createBooking()
```

```js
getAllBookings()
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

Ejemplos de operaciones utilizadas:

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

Para las reservas también se utilizan operaciones de Mongoose como:

```js
BookingModel.find()
```

```js
BookingModel.findById(id)
```

```js
BookingModel.create(data)
```

```js
BookingModel.findByIdAndUpdate(id, data)
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
* Uso de `populate` para obtener servicios asociados a una reserva.
* Inyección de dependencias mediante configuración centralizada.
* IDs generados automáticamente por MongoDB.
* Validación de datos mediante Zod.
* Validación de parámetros `ObjectId`.
* Manejo de errores HTTP.
* Uso de `req.params`, `req.query` y `req.body`.
* Organización mediante Express Router.
* Reglas de negocio implementadas dentro de Services.
* Acceso a datos aislado mediante DAO.
* Repositories como capa intermedia entre lógica de negocio y persistencia.
* Variables de entorno para la conexión con MongoDB Atlas.
* Paginación de servicios.
* Filtrado de servicios mediante query params.
* Ordenamiento de servicios.
* Vistas server-side mediante Express Handlebars.
* Layout compartido mediante Handlebars.
* Archivos estáticos mediante Express.
* Comunicación en tiempo real mediante Socket.IO.
* Actualización de disponibilidad de servicios sin recargar la página.
* La API REST continúa funcionando independientemente de las vistas.

---

# Correcciones y mejoras implementadas

Durante el desarrollo se realizaron distintas mejoras sobre la aplicación:

* Se agregó `getAll()` al DAO de bookings para permitir la consulta de todas las reservas.
* Se implementó una validación para impedir eliminar servicios asociados a reservas activas.
* Se migró la persistencia desde archivos JSON hacia MongoDB Atlas.
* Se incorporó Express Handlebars para las vistas server-side.
* Se incorporó Socket.IO para comunicación en tiempo real.
* Se implementó el cambio de disponibilidad de servicios mediante Socket.IO.
* Se mantuvo la arquitectura en capas existente.
* Se mantuvo la API REST sin reemplazar sus endpoints.
* Se agregaron archivos públicos para CSS y JavaScript.
* Se incorporó Zod para la validación de datos.
* Se agregaron validaciones para los identificadores `ObjectId`.
* Se incorporó paginación, filtrado y ordenamiento para la consulta de servicios.
* Se implementó `populate` para obtener los servicios asociados a las reservas.
* Se implementó la regla de negocio para incrementar `quantity` cuando se agrega nuevamente el mismo servicio a una reserva.

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
