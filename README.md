# Administrador de Servicios - Backend Turnos y Reservas

## Descripción

Este proyecto implementa un administrador de servicios para un sistema de turnos y reservas utilizando Node.js, módulos ES (ESM) y dotenv. La lógica principal se encuentra en la clase `ServiceManager`, encargada de gestionar los servicios.

## Tecnologias utilizadas

- node.js
- dotenv
- HTTP (módulo nativo de Node.js)

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

## Ejemplos de uso de los métodos

### Obtener todos los servicios

```js
serviceManager.getServices();
```

### Obtener un servicio por ID

```js
serviceManager.getServiceById(1);
```

### Agregar un servicio

```js
serviceManager.addService({
    name: "Masaje",
    description: "Masaje relajante",
    duration: 60,
    price: 25000,
    category: "Bienestar",
    available: true
});
```

### Actualizar un servicio

```js
serviceManager.updateService(1, {
    name: "Masaje Premium",
    description: "Masaje relajante",
    duration: 90,
    price: 30000,
    category: "Bienestar",
    available: true
});
```

### Eliminar un servicio

```js
serviceManager.deleteService(1);
```