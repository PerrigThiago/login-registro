import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate(); 
  
  const [formData, setFormData] = useState({
    gmail: '',
    contrasenia: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,  // ✅
        formData
      );
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="gmail"
          placeholder="Correo electrónico"
          value={formData.gmail}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contrasenia"
          placeholder="Contraseña"
          value={formData.contrasenia}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>

      <div className="login-links">
        <button
          type="button"
          className="link-button"
          onClick={() => navigate('/forgot-password')}
        >
          ¿Olvidaste tu contraseña?
        </button>

        <button
          type="button"
          className="outline-button"
          onClick={() => navigate('/registro')}
        >
          Crear cuenta nueva
        </button>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;