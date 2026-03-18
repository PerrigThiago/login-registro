import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Registro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        gmail: '',
        nombre: '',
        contrasenia: '',
        confirmarContrasenia: ''
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

        if (formData.contrasenia !== formData.confirmarContrasenia) {
            setError('Las contraseñas no coinciden, vueva a intentarlo por favor');
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/auth/registro', {
                gmail: formData.gmail,
                nombre: formData.nombre,
                contrasenia: formData.contrasenia    
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Error al registrar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registro-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="gmail"
                    placeholder="Email"
                    value={formData.gmail}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
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
                <input
                    type="password"
                    name="confirmarContrasenia"
                    placeholder="Confirmar Contraseña"
                    value={formData.confirmarContrasenia}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
        </div>
    );
};

export default Registro;