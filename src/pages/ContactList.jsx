import { Link } from "react-router-dom";

export default function ContactCard({ contacto, onEliminar }) {
  
  const handleBorrar = () => {
    // Implementación del requisito opcional: Confirmación antes de borrar
    const seguro = window.confirm(`¿Estás seguro de que deseas eliminar a ${contacto.name}?`);
    if (seguro) {
      onEliminar(contacto.id);
    }
  };

  return (
    <div className="card mb-3 shadow-sm" style={{ maxWidth: "100%" }}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img 
            src="https://via.placeholder.com" 
            className="rounded-circle me-3" 
            alt="profile" 
          />
          <div>
            <h5 className="card-title mb-1">{contacto.name}</h5>
            <p className="card-text mb-0 text-muted">📍 {contacto.address}</p>
            <p className="card-text mb-0 text-muted">📞 {contacto.phone}</p>
            <p className="card-text mb-0 text-muted">✉️ {contacto.email}</p>
          </div>
        </div>
        
        <div className="actions">
          {/* Usamos /edit-contact/ que es la ruta que definimos en routes.js */}
          <Link to={`/edit-contact/${contacto.id}`} className="btn btn-link text-dark me-2">
            <i className="fas fa-pencil-alt"></i> ✏️
          </Link>
          <button onClick={handleBorrar} className="btn btn-link text-danger border-0">
            <i className="fas fa-trash"></i> ❌
          </button>
        </div>
      </div>
    </div>
  );
}
