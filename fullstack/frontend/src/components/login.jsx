import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
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
            const response = await axios.post('http://localhost:3000/api/auth/login', formData);

            // Guardar token
            localStorage.setItem('token', response.data.token);
            
            // Redirigir al dashboard
            const navigate = useNavigate();

            navigate('/dashboard');

        } catch (err) {
            setError(err.response?.data?.error || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-container'>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    name='gmail'
                    placeholder='Email'
                    value={formData.gmail}
                    onChange={handleChange}
                    required
                />
                <input
                    type='password'
                    name='contrasenia'
                    placeholder='Contraseña'
                    value={formData.contrasenia}
                    onChange={handleChange}
                    required
                />
                <button type='submit' disabled={loading}>
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
            </form>
            {error && <p className='error'>{error}</p>}
        </div>
    );
}

export default Login;