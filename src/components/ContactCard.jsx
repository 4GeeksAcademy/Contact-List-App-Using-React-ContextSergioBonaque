
import { Link } from "react-router-dom";

export default function ContactCard({ contacto, onEliminar }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "12px",
      margin: "8px 0",
      borderRadius: "6px",
      backgroundColor: "#f9f9f9"
    }}>
      <h4>{contacto.full_name}</h4>
      <p>📧 {contacto.email || "Sin email"}</p>
      <p>📱 {contacto.phone || "Sin teléfono"}</p>
      <p>📍 {contacto.address || "Sin dirección"}</p>

      <div>
        <Link to={`/editar/${contacto.id}`} style={{ marginRight: "10px" }}>
          ✏️ Editar
        </Link>
        <button
          onClick={() => {
            if (window.confirm(`¿Borrar a ${contacto.full_name}?`)) {
              onEliminar(contacto.id);
            }
          }}
          style={{
            background: "#e74c3c",
            color: "white",
            border: "none",
            padding: "4px 8px",
            borderRadius: "4px"
          }}
        >
          ❌ Borrar
        </button>
      </div>
    </div>
  );
}