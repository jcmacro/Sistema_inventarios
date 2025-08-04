import React, { useState, useEffect } from 'react';
import EditProductModal from './EditProductModal';
import '../App.css'; 

function ProductList() {
  const [productos, setProductos] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/products');
      if (!response.ok) throw new Error('No se pudo obtener la lista de productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) return;
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert("No estás autenticado.");
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('No se pudo eliminar el producto.');
      alert((await response.json()).mensaje);
      setProductos(productos.filter(p => p.id !== productId));
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert(error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
  };

  const handleUpdateSuccess = (updatedProduct) => {
    setProductos(productos.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>{producto.stock}</td>
              <td className="actions-cell">
                <button onClick={() => handleEdit(producto)} className="edit-btn">Editar</button>
                <button onClick={() => handleDelete(producto.id)} className="delete-btn">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProduct && (
        <EditProductModal 
          product={editingProduct}
          onClose={handleCloseModal}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
}

export default ProductList;