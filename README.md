# Administrador de Servicios - Backend Turnos y Reservas

## Descripción

Este proyecto implementa un administrador de servicios para un sistema de turnos y reservas utilizando Node.js, Express, módulos ES (ESM) y dotenv.

La lógica principal se encuentra en la clase ServiceManager, encargada de gestionar los servicios. Express se utiliza para crear la API y definir las rutas correspondientes a las operaciones CRUD.

## Tecnologias utilizadas

- Node.js
- Express
- dotenv
- ES Modules (ESM)

## Instalacion

1. Clonar el repositorio
```bash
git clone https://github.com/IvanGabriel1/Backend-Coder-PreEntregas-IvanBraun.git
```

2. Entrar a la carpeta del proyecto:

```bash
cd backend-turnos-reservas
```

3. Instalar las dependencias:

```bash
npm install
```

## Ejecución

Modo desarrollo:

```bash
npm run dev
```

El servidor se ejecuta en:

http://localhost:8080

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=8080
NODE_ENV=development
```

También se incluye un archivo `.env.example` como referencia.

## Recurso: Services

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

```js
GET /api/services
```

### Obtener un servicio por ID

```js
GET /api/services/:id
```

### Agregar un servicio

```js
POST /api/services
```

Ejemplo de body:

```js

{
  "name": "Masaje",
  "description": "Masaje relajante",
  "duration": 60,
  "price": 25000,
  "category": "Bienestar",
  "available": true
}

```

El id no debe enviarse en el body. Se genera internamente.

### Actualizar un servicio

```js
PUT /api/services/:id
```

Ejemplo de body:

```js
{ 
    "name": "Masaje Premium",
    "description": "Masaje relajante",
    "duration": 90,
    "price": 30000,
    "category": "Bienestar",
    "available": true 
}
```

### Eliminar un servicio

```js
DELETE /api/services/:id
```

Ejemplo: 

```js 
DELETE /api/services/1
```

## Metodos de ServiceManager

### Obtener todos los servicios

``` js
serviceManager.getServices();
```

### Obtener un servicio por ID

``` js
serviceManager.getServiceById(1);
```

### Agregar un servicio

``` js
serviceManager.addService({ 
    name: "Masaje",
    description: "Masaje relajante", 
    duration: 60, 
    price: 25000, 
    category: "Bienestar", 
    available: true });
```
### Actualizar un servicio

``` js
serviceManager.updateService(1, { 
    name: "Masaje Premium", 
    description: "Masaje relajante", 
    duration: 90, 
    price: 30000, 
    category: "Bienestar", 
    available: true });
```

### Eliminar un servicio

``` js
serviceManager.deleteService(1);
```