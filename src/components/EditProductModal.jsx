import React, { useState, useEffect } from 'react';

function EditProductModal({ product, onClose, onUpdateSuccess }) {
  const [formData, setFormData] = useState({ ...product });

  useEffect(() => {
    setFormData({ ...product });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert("No estás autenticado.");
      return;
    }

    const updatedData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock, 10),
        id_categoria: parseInt(product.id_categoria, 10) // Usamos el id de categoria original
    };

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('No se pudo actualizar el producto.');
      }

      const result = await response.json();
      alert(result.mensaje);
      onUpdateSuccess({ ...updatedData, id: product.id });
      onClose();
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert(error.message);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <input type="text" name="descripcion" value={formData.descripcion || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <input type="number" name="precio" step="0.01" value={formData.precio} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Stock:</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
          </div>
          <div className="form-group-buttons">
             <button type="submit">Guardar Cambios</button>
             <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;