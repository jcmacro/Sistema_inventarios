import React from 'react';

function Dashboard() {
  // Datos de ejemplo para el dashboard
  const summaryData = {
    productCount: 150,
    categoryCount: 12,
    lowStockCount: 5
  };

  return (
    <div className="dashboard">
      <h2>PANEL PRINCIPAL</h2>

      <div className="summary-cards">
        <div className="card card-products">
          <h3>Cantidad de Productos</h3>
          <p>{summaryData.productCount}</p>
        </div>
        <div className="card card-categories">
          <h3>Cantidad de Categorías</h3>
          <p>{summaryData.categoryCount}</p>
        </div>
        <div className="card card-low-stock">
          <h3>Productos con bajo STOCK</h3>
          <p>{summaryData.lowStockCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;