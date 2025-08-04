import React, { useState } from 'react';

function LoginForm({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

// En src/components/LoginForm.jsx

const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al iniciar sesión');
      }

      const data = await response.json();
      
      // --- CAMBIO IMPORTANTE AQUÍ ---
      localStorage.setItem('accessToken', data.access_token);
      // Guardamos el objeto de usuario como un string JSON
      localStorage.setItem('user', JSON.stringify(data.user)); 
      
      onLoginSuccess();

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1>INVENTARIOS S.A.</h1>
      <h2>INICIO DE SESION</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
      <div className="register-link">
        {/* ESTE ES EL ÚNICO ENLACE QUE DEBE EXISTIR */}
        <p>¿No tienes cuenta? <a href="#" onClick={onSwitchToRegister}>Regístrate aquí</a></p>
      </div>
    </div>
  );
}

export default LoginForm;