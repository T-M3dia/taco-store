# 🌮 Taco Store API

API REST para una tienda de tacos en línea, construida con Hono + TypeScript + Bun.

## Quick Start

### Requisitos
- [Bun](https://bun.sh) instalado

### Instalación
```bash
bun install
```

### Correr el servidor
```bash
bun dev
```

El servidor estará disponible en: http://localhost:3000

## Endpoints

### Tacos
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /tacos | Obtener todos los tacos |
| GET | /tacos/:id | Obtener un taco por ID |
| POST | /tacos | Crear un nuevo taco |
| PUT | /tacos/:id | Actualizar un taco |
| DELETE | /tacos/:id | Eliminar un taco |

### Orders
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /orders | Obtener todos los pedidos |
| GET | /orders/:id | Obtener un pedido por ID |
| POST | /orders | Crear un nuevo pedido |
| PUT | /orders/:id | Actualizar estado del pedido |
| DELETE | /orders/:id | Eliminar un pedido |

## Ejemplo de uso

### Obtener menú
```bash
curl http://localhost:3000/tacos
```

### Crear un pedido
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"customerName": "Juan", "items": [{"tacoId": "1", "quantity": 2}]}'
```

## Tests
```bash
bun test
```
