import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <h2>¡Bienvenido al Dashboard!</h2>
            <p>Has iniciado sesión exitosamente.</p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}

export default Dashboard;