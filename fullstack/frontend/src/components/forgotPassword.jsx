import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    try {
      await axios.post(`${process.env.BACKEND_URL}/api/auth/forgot-password`, { gmail: email });
      setMsg('Te enviamos un email con instrucciones. Revisa tu bandeja.');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al enviar el email');
    }
  };

  return (
    <div className="login-container">
      <h2>Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Enviar email</button>
      </form>

      {msg && <p className="success">{msg}</p>}
      {error && <p className="error">{error}</p>}

      <button className="link-button" onClick={() => navigate('/login')}>
        Volver al inicio
      </button>
    </div>
  );
}

export default ForgotPassword;