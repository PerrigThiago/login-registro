import { useLocation } from "react-router-dom";
import './verificacion.css'; // ✅ importar estilos

function VerificarEmail() {
    const { state } = useLocation();
    const gmail = state?.gmail;

    return (
        <div className="verificar-container">
            <div className="verificar-icono">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
            </div>

            <h2>Revisá tu correo</h2>

            <p className="verificar-descripcion">
                Te enviamos un link
                {gmail && <> a <strong>{gmail}</strong></>} para activar tu cuenta.
            </p>

            <p className="verificar-spam">
                Si no lo ves, revisá la carpeta de spam.
            </p>

            <div className="verificar-reenviar">
                ¿No recibiste el mail? <span>Reenviar</span>
            </div>
        </div>
    );
}

export default VerificarEmail;