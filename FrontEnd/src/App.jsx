import React, { useState, useEffect } from 'react';
import './App.css'; 
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Estado para el usuario actual
  const [view, setView] = useState('dashboard');
  const [authView, setAuthView] = useState('login');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user'); // Obtenemos al usuario
    if (token && user) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(user)); // Convertimos el string de vuelta a objeto
    }
  }, []);

  const handleLoginSuccess = () => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(true);
    setCurrentUser(JSON.parse(user));
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user'); // Borramos también al usuario
    setIsLoggedIn(false);
    setCurrentUser(null);
    setAuthView('login');
  };

  const renderView = () => {
    if (view === 'list') return <ProductList />;
    if (view === 'add') return <AddProductForm />;
    return <Dashboard />;
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        {authView === 'login' ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setAuthView('register')} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setAuthView('login')} />
        )}
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>INVENTARIOS S.A.</h1>
        <div className="header-user-info">
          {/* Mostramos el nombre del usuario del estado */}
          <span>Usuario: {currentUser?.nombre_usuario}</span>
          <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
        </div>
      </header>
      <nav className="dashboard-nav">
        <button onClick={() => setView('dashboard')} disabled={view === 'dashboard'}>Panel Principal</button>
        <button onClick={() => setView('list')} disabled={view === 'list'}>Gestión de Productos</button>
        <button onClick={() => setView('add')} disabled={view === 'add'}>Añadir Producto</button>
      </nav>
      <main>
        {renderView()}
      </main>
    </div>
  );
}

export default App;