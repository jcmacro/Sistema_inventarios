from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
from flask_cors import CORS

# Crear una instancia de la aplicación Flask
app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "una-clave-super-secreta-que-nadie-adivine" # ¡Cambia esto!
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- CONFIGURACION DE LA BASE DE DATOS ---
# Se configura la conexión a PostgreSQL, añadiendo el parámetro de codificación al final.
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:1234@127.0.0.1:5432/sistema_inventario_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Crear el objeto de la base de datos
db = SQLAlchemy(app)

# --- MODELOS DE LA BASE DE DATOS ---

class Categoria(db.Model):
    __tablename__ = 'categorias'
    id_categoria = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False, unique=True)
    descripcion = db.Column(db.String(255))
    productos = db.relationship('Producto', backref='categoria', lazy=True)

    def __repr__(self):
        return f"<Categoria {self.nombre}>"

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    rol = db.Column(db.String(20), default='usuario')
    fecha_creacion = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f"<Usuario {self.email}>"

class Producto(db.Model):
    __tablename__ = 'productos'
    id_productos = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(255))
    precio = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)
    fecha_agregado = db.Column(db.DateTime, default=db.func.current_timestamp())
    id_categoria = db.Column(db.Integer, db.ForeignKey('categorias.id_categoria'), nullable=False)

    def __repr__(self):
        return f"<Producto {self.nombre}>"

# Nombre de la clase corregido a 'HistorialMovimiento'
class HistorialMovimiento(db.Model):
    __tablename__ = 'historial_movimientos'
    id_historial = db.Column(db.Integer, primary_key=True)
    tipo_movimiento = db.Column(db.String(50), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    fecha_movimiento = db.Column(db.DateTime, default=db.func.current_timestamp())
    descripcion = db.Column(db.String(255))
    id_productos = db.Column(db.Integer, db.ForeignKey('productos.id_productos'), nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id_usuario'), nullable=False)
    producto = db.relationship('Producto', backref='movimientos', lazy=True)
    usuario = db.relationship('Usuario', backref='movimientos', lazy=True)

    def __repr__(self):
        return f"<Movimiento {self.id_historial}>"

# --- RUTA DE LA APLICACIÓN ---
@app.route('/')
def index():
    return jsonify({"mensaje": "API del Sistema de Inventario esta en linea"}), 200

# --- ENDPOINTS DE LA API PARA CRUD ---

# Endpoint para OBTENER todos los productos
@app.route('/api/products', methods=['GET'])
def get_all_products():
    try:
        productos_db = Producto.query.all()
        lista_de_productos = []
        for producto in productos_db:
            lista_de_productos.append({
                'id': producto.id_productos,
                'nombre': producto.nombre,
                'descripcion': producto.descripcion,
                'precio': producto.precio,
                'stock': producto.stock,
                'id_categoria': producto.id_categoria
            })
        return jsonify(lista_de_productos), 200
    except Exception as e:
        return jsonify({"mensaje": "Error al obtener los productos", "error": str(e)}), 500

# Endpoint para CREAR un nuevo producto
@app.route('/api/products', methods=['POST'])
@jwt_required()
def create_product():
    try:
        data = request.get_json()
        nuevo_producto = Producto(
            nombre=data['nombre'],
            descripcion=data.get('descripcion', ''),
            precio=data['precio'],
            stock=data['stock'],
            id_categoria=data['id_categoria']
        )
        db.session.add(nuevo_producto)
        db.session.commit()
        return jsonify({"mensaje": "Producto creado exitosamente", "id": nuevo_producto.id_productos}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"mensaje": "Error al crear el producto", "error": str(e)}), 500

# Endpoint para OBTENER un producto por su ID
@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    try:
        producto = Producto.query.get(product_id)
        if not producto:
            return jsonify({"mensaje": "Producto no encontrado"}), 404
        return jsonify({
            'id': producto.id_productos,
            'nombre': producto.nombre,
            'descripcion': producto.descripcion,
            'precio': producto.precio,
            'stock': producto.stock,
            'id_categoria': producto.id_categoria
        }), 200
    except Exception as e:
        return jsonify({"mensaje": "Error al obtener el producto", "error": str(e)}), 500

# Endpoint para ACTUALIZAR un producto
@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    try:
        producto = Producto.query.get(product_id)
        if not producto:
            return jsonify({"mensaje": "Producto no encontrado"}), 404

        data = request.get_json()
        producto.nombre = data.get('nombre', producto.nombre)
        producto.descripcion = data.get('descripcion', producto.descripcion)
        producto.precio = data.get('precio', producto.precio)
        producto.stock = data.get('stock', producto.stock)
        producto.id_categoria = data.get('id_categoria', producto.id_categoria)

        db.session.commit()
        return jsonify({"mensaje": "Producto actualizado exitosamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"mensaje": "Error al actualizar el producto", "error": str(e)}), 500

# Endpoint para ELIMINAR un producto
@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        producto = Producto.query.get(product_id)
        if not producto:
            return jsonify({"mensaje": "Producto no encontrado"}), 404

        db.session.delete(producto)
        db.session.commit()
        return jsonify({"mensaje": "Producto eliminado exitosamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"mensaje": "Error al eliminar el producto", "error": str(e)}), 500


# --- ENDPOINTS DE AUTENTICACIÓN ---
#  REGISTRAR un nuevo usuario
@app.route('/api/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')
        nombre_usuario = data.get('nombre_usuario')

        if not email or not password or not nombre_usuario:
            return jsonify({"mensaje": "Email, contraseña y nombre de usuario son requeridos"}), 400

        # Verificar si el usuario ya existe
        usuario_existente = Usuario.query.filter_by(email=email).first()
        if usuario_existente:
            return jsonify({"mensaje": "El email ya está registrado"}), 409

        # Encriptar la contraseña antes de guardarla
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        nuevo_usuario = Usuario(
            nombre_usuario=nombre_usuario,
            email=email,
            password=hashed_password  # Guardamos la contraseña encriptada
        )

        db.session.add(nuevo_usuario)
        db.session.commit()

        return jsonify({"mensaje": "Usuario registrado exitosamente"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"mensaje": "Error al registrar el usuario", "error": str(e)}), 500


# Endpoint para INICIAR SESIÓN y obtener un token
@app.route('/api/login', methods=['POST'])
def login_user():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"mensaje": "Email y contraseña son requeridos"}), 400

        usuario = Usuario.query.filter_by(email=email).first()

        if usuario and bcrypt.check_password_hash(usuario.password, password):
            access_token = create_access_token(identity=str(usuario.id_usuario))

            # --- CAMBIO IMPORTANTE AQUÍ ---
            # Ahora devolvemos el token Y los datos del usuario
            return jsonify({
                "access_token": access_token,
                "user": {
                    "id": usuario.id_usuario,
                    "nombre_usuario": usuario.nombre_usuario,
                    "email": usuario.email
                }
            })
        else:
            return jsonify({"mensaje": "Credenciales inválidas"}), 401

    except Exception as e:
        return jsonify({"mensaje": "Error al iniciar sesión", "error": str(e)}), 500

# --- BLOQUE PARA EJECUTAR LA APP ---
if __name__ == '__main__':
    app.run(debug=True)