import { useNavigate } from "react-router-dom";
import './verificacion.css'; // ✅ importar estilos

function Verificado() {
    const navigate = useNavigate();

    return (
        <div className="verificar-container">
            <div className="verificar-icono verificar-icono--exito">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                </svg>
            </div>

            <h2>¡Cuenta verificada!</h2>

            <p className="verificar-descripcion">
                Tu cuenta fue activada con éxito. Ya podés iniciar sesión.
            </p>

            <button
                className="verificar-btn"
                onClick={() => navigate('/login')}
            >
                Ir al login
            </button>
        </div>
    );
}

export default Verificado;