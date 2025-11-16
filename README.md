# 🚗 API Transportista - Sistema de Gestión de Conductores

## 📋 Descripción del Proyecto
**Proyecto Académico** - Web Service desarrollado como parte del parcial de Desarrollo Web, implementando una API RESTful para la gestión de conductores de una empresa transportista utilizando Node.js, Express y PostgreSQL.

---

## 🎯 Objetivos del Parcial

### 📖 Competencias Evaluadas
- ✅ **Desarrollo Backend**: Creación de APIs REST con Node.js y Express
- ✅ **Base de Datos**: Diseño e implementación con PostgreSQL
- ✅ **Endpoints**: Implementación de operaciones CRUD
- ✅ **Despliegue**: Configuración y deployment en Render.com
- ✅ **Documentación**: Creación de documentación técnica clara

### 🎓 Criterios de Evaluación
| Criterio | Puntuación | Estado |
|----------|------------|---------|
| Funcionalidad de Endpoints | 40% | ✅ **Completado** |
| Estructura de Base de Datos | 20% | ✅ **Completado** |
| Calidad del Código | 20% | ✅ **Completado** |
| Despliegue y Documentación | 20% | ✅ **Completado** |

---

## 🏗️ Arquitectura del Sistema

### 📊 Diagrama de Arquitectura
┌─────────────────┐ ┌──────────────────┐ ┌────────────────────┐
│ Cliente │ │ API Express │ │ PostgreSQL │
│ (Frontend/ │───▶│ Node.js │───▶│ Database │
│ Postman) │ │ │ │ │
└─────────────────┘ └──────────────────┘ └────────────────────┘
│ │ │
│ JSON Requests │ SQL Queries │ Data Storage
│ JSON Responses │ Connection Pool │ Relations

text

### 🗃️ Modelo de Base de Datos
```
sql
conductores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  licencia VARCHAR(20) UNIQUE NOT NULL,
  telefono VARCHAR(15),
  fecha_registro DATE DEFAULT CURRENT_DATE
)
```

### 📚 Endpoints Implementados
🔹 Registrar Conductor
POST /conductores

json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "licencia": "LIC123456",
  "telefono": "555-1234"
}
🔹 Consultar Conductor
GET /conductores/:licencia

bash
GET /conductores/LIC123456
🔹 Listar Conductores
GET /conductores

bash
GET /conductores
🔹 Health Check
GET /health

bash
GET /health
🔹 Documentación API
GET /

bash
GET /

### 🚀 Instalación y Configuración
Prerrequisitos
✅ Node.js 18+ instalado

✅ PostgreSQL 12+ ejecutándose

✅ Git para control de versiones

🛠️ Configuración Local
bash
### 1. Clonar o crear proyecto
mkdir transportista-app
cd transportista-app

### 2. Inicializar proyecto Node.js
npm init -y

### 3. Instalar dependencias
npm install express pg dotenv

### 4. Configurar variables de entorno
echo "DATABASE_URL=postgresql://usuario:password@localhost:5432/transportista" > .env
echo "PORT=3000" >> .env

### 5. Ejecutar en desarrollo
npm run dev
🌐 Configuración Base de Datos
sql
-- Conectar a PostgreSQL y ejecutar:
CREATE DATABASE transportista;

-- La tabla se crea automáticamente al iniciar la aplicación
### ☁️ Despliegue en Render.com
📦 Configuración de Render
Configuración	Valor
Runtime	Node
Build Command	npm install
Start Command	npm start
Environment	production

### 🔑 Variables de Entorno en Render
env
DATABASE_URL=postgresql://user:pass@host:port/database
NODE_ENV=production

### 🔄 Flujo de Despliegue
Push a GitHub → Trigger automático en Render

Build → Instalación de dependencias

Deploy → Servicio disponible en URL pública

### 🧪 Pruebas de la API
Pruebas con cURL
bash
### Health Check
curl https://tu-api.onrender.com/health

### Registrar conductor
curl -X POST https://tu-api.onrender.com/conductores \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Maria","apellido":"Garcia","licencia":"LIC789","telefono":"555-9876"}'

### Listar conductores
curl https://tu-api.onrender.com/conductores

### Consultar conductor
curl https://tu-api.onrender.com/conductores/LIC789
Pruebas con Thunder Client (VS Code)
Instalar extensión Thunder Client

Importar colección de pruebas

Ejecutar endpoints individualmente

### 📊 Estructura del Proyecto
```
transportista-app/
├── 📄 server.js          # Servidor principal y endpoints
├── 📄 database.js        # Configuración de PostgreSQL
├── 📄 package.json       # Dependencias y scripts
├── 📄 .env              # Variables de entorno (local)
├── 📄 .gitignore        # Archivos ignorados por Git
└── 📄 README.md         # Documentación
```

## 🔧 Tecnologías Utilizadas
### 🎯 Backend
Tecnología	Versión	Uso
Node.js	18+	Runtime JavaScript
Express.js	4.18+	Framework Web
PG	8.11+	Cliente PostgreSQL
Dotenv	16.3+	Manejo de variables

### 🗄️ Base de Datos
Componente	Detalle
PostgreSQL	Sistema de base de datos relacional
Tablas	1 tabla: conductores
Conexión	Pool de conexiones con SSL

### ☁️ Infraestructura
Servicio	Función
Render.com	Hosting y despliegue automático
PostgreSQL	Base de datos en la nube
GitHub	Control de versiones y CI/CD

## 🎓 Aprendizajes del Parcial
### 💡 Conceptos Implementados
✅ APIs RESTful con métodos HTTP adecuados

✅ Operaciones CRUD completas (Create, Read)

✅ Validación de datos y manejo de errores

✅ Conexión a base de datos con pooling

✅ Variables de entorno para configuración

✅ Despliegue en la nube con Render.com

### 🔄 Flujo de Desarrollo
Desarrollo Local → Pruebas en entorno controlado

Control de Versiones → Git y GitHub

Integración Continua → Deploy automático en Render

Pruebas en Producción → Verificación de funcionalidad

## 🚀 Próximas Mejoras
### 🔮 Roadmap de Desarrollo
Validación avanzada de datos de entrada

Paginación para listas grandes

Búsqueda y filtros avanzados

Autenticación con JWT

Documentación Swagger/OpenAPI

Métricas y monitoreo

Tests automatizados

## 📞 Soporte y Contacto
### 🐛 Reportar Issues
Si encuentras algún problema, por favor:

Verificar los logs en Render.com

Revisar la configuración de variables de entorno

Probar los endpoints con los ejemplos proporcionados

## 📚 Recursos Adicionales
Documentación de Express.js

Guía de PostgreSQL

Render.com Documentation

## 👨‍💻 Desarrollado por
Estudiante de Desarrollo Web
🎓 Proyecto académico para evaluación parcial
🚀 Implementando mejores prácticas de desarrollo
💡 Aprendiendo backend con Node.js y PostgreSQL

<div align="center">
¡Proyecto completado exitosamente! 🎉
¿Preguntas? ¡No dudes en consultar!

</div>

## 🎨 VERSIÓN BONITA CON BADGES
markdown

### 🚗 API Transportista - Sistema de Gestión de Conductores

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![Express.js](https://img.shields.io/badge/Express.js-4.18%2B-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12%2B-orange)
![Render](https://img.shields.io/badge/Deploy-Render.com-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

### 📖 Descripción
Web Service académico desarrollado para el parcial de **Desarrollo Web**, implementando una API REST completa para gestión de conductores con arquitectura moderna y despliegue en la nube.

### 🎯 Estado del Proyecto
| Componente | Estado | Despliegue |
|------------|--------|------------|
| **API Endpoints** | ✅ Completado | 🌐 Production |
| **Base de Datos** | ✅ Completado | 🗄️ PostgreSQL |
| **Documentación** | ✅ Completado | 📚 README.md |

### 🚀 Quick Start
```bash
# Clonar y ejecutar
git clone <repo>
cd transportista-app
npm install
npm start

# Probar API
curl http://localhost:3000/health
📋 Endpoints Principales
Método	Endpoint	Descripción
POST	/conductores	Registrar nuevo conductor
GET	/conductores/:licencia	Consultar conductor
GET	/conductores	Listar todos los conductores
GET	/health	Estado del servicio
