# Sistema de Gestión de Inventario Inventory Management System

Una aplicación web full-stack para la gestión de un inventario, construida con React en el frontend y Flask (Python) en el backend, con conexión a una base de datos PostgreSQL.

## 📸 Capturas de Pantalla

| Login                                       | Panel Principal                                     | Gestión de Productos                                |
| ------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| ![Login](./screenshots/login.png) | ![Panel Principal](./screenshots/dashboard.png) | ![Gestión de Productos](./screenshots/gestion.png) |

*(Nota: Asegúrate de que las rutas a tus imágenes sean correctas. Por ejemplo: `./screenshots/login.png`)*

## ✨ Características Principales Features

- **Autenticación Segura:** Sistema completo de Registro y Login de usuarios usando tokens **JWT** (JSON Web Tokens).
- **Gestión de Productos (CRUD):** Funcionalidad completa para Crear, Leer, Actualizar y Eliminar productos.
- **Panel Principal (Dashboard):** Vista inicial con tarjetas de resumen y estadísticas clave del inventario.
- **Interfaz Reactiva:** Experiencia de usuario fluida y moderna construida con **React**.
- **Backend Robusto:** API RESTful construida con **Flask** que gestiona toda la lógica de negocio y la seguridad.

## 🛠️ Tecnologías Utilizadas Tech Stack

#### Backend
- **Lenguaje:** Python
- **Framework:** Flask
- **Base de Datos:** PostgreSQL
- **ORM:** Flask-SQLAlchemy
- **Autenticación:** Flask-JWT-Extended
- **Seguridad:** Flask-Bcrypt (para hasheo de contraseñas)
- **Comunicación:** Flask-Cors

#### Frontend
- **Librería:** React
- **Entorno de Desarrollo:** Vite
- **Lenguaje:** JavaScript (JSX) & CSS

---

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### Prerrequisitos
Asegúrate de tener instalado lo siguiente:
- [Python 3.10+](https://www.python.org/downloads/)
- [Node.js y npm](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/download/)

### 1. Configuración del Backend
```bash
# 1. Clona el repositorio
git clone [https://URL-DE-TU-REPOSITORIO.git](https://URL-DE-TU-REPOSITORIO.git)
cd nombre-del-proyecto/backend

# 2. Crea y activa un entorno virtual
python -m venv .venv
# En Windows:
# .\.venv\Scripts\activate
# En macOS/Linux:
# source .venv/bin/activate

# 3. Instala las dependencias de Python
pip install -r requirements.txt

# 4. Configura la base de datos
#    - Asegúrate de que PostgreSQL esté corriendo.
#    - Crea una nueva base de datos (ej: sistema_inventario_db).
#    - Actualiza la cadena de conexión en `app.py` si es necesario:
#      app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://usuario:contraseña@host:puerto/nombre_db'

# 5. Inicia el servidor de Flask
flask run
```
El backend estará corriendo en `http://127.0.0.1:5000`.

### 2. Configuración del Frontend
```bash
# 1. Abre una nueva terminal y navega a la carpeta del frontend
cd ../frontend

# 2. Instala las dependencias de Node.js
npm install

# 3. Inicia el servidor de desarrollo de Vite
npm run dev
```
El frontend estará corriendo en `http://localhost:5173`. Abre esta URL en tu navegador.