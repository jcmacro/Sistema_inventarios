import React, { useState } from 'react';

function RegisterForm({ onSwitchToLogin }) {
  const [nombre_usuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_usuario, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al registrar el usuario.');
      }

      alert('¡Usuario registrado exitosamente! Ahora puedes iniciar sesión.');
      onSwitchToLogin(); // Cambia a la vista de login después del registro exitoso
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1>INVENTARIOS S.A.</h1>
      <h2>REGISTRO DE USUARIO</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario:</label>
          <input id="username" type="text" value={nombre_usuario} onChange={(e) => setNombreUsuario(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
      <div className="register-link">
        <p>¿Ya tienes cuenta? <a href="#" onClick={onSwitchToLogin}>Inicia sesión aquí</a></p>
      </div>
    </div>
  );
}

export default RegisterForm;