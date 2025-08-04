import React, { useState } from 'react';

function AddProductForm() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [idCategoria, setIdCategoria] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nuevoProducto = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock, 10),
      id_categoria: idCategoria
    };

    // Obtenemos el token guardado del almacenamiento local
    const token = localStorage.getItem('accessToken');

    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión de nuevo.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Esta es la línea clave que envía el token para autorización
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(nuevoProducto)
      });

      if (!response.ok) {
        throw new Error('No se pudo crear el producto.');
      }
      
      const data = await response.json();
      console.log("Producto creado:", data);
      alert("¡Producto creado exitosamente!");
      
      // Limpiar el formulario después de crear
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setStock('');

    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert(error.message);
    }
  };

  return (
    <div className="product-form">
      <h2>Añadir Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input type="number" step="0.01" value={precio} onChange={e => setPrecio(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Stock:</label>
          <input type="number" value={stock} onChange={e => setStock(e.target.value)} required />
        </div>
        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
}

export default AddProductForm;