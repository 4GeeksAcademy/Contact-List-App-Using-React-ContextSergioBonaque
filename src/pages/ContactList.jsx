// sin import no reconoce el desarrollo
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { obtenerContactos, borrarContacto } from "../services/ApiContactos";
import ContactCard from "../components/ContactCard";

export default function ContactList() {

  const [contactos, setContactos] = useState([]);
  const { store,dispatch } = useGlobalReducer()

  useEffect(() => {
    const cargar = async () => {

      try {
        const resultadoContactos = await obtenerContactos();
        setContactos(resultadoContactos)

      } catch (err) {

      }
    };
    cargar();
  }, []);

  const manejarBorrado = async (id) => {
    try {
      await borrarContacto(id);
      const contactosActualizados = await obtenerContactos();
      dispatch({ tipo: "CARGAR_CONTACTOS", contactos: contactosActualizados });
    } catch (err) {
      alert("Error al borrar: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Mis Contactos</h1>
      <Link
        to="/add-contact"
        style={{
          display: "inline-block",
          background: "#2ecc71",
          color: "white",
          padding: "8px 16px",
          textDecoration: "none",
          borderRadius: "4px",
          marginBottom: "20px"
        }}
      >
        ➕ Añadir contacto
      </Link>

      {store.cargando && <p>⏳ Cargando...</p>}
      {store.error && <p style={{ color: "red" }}>⚠️ {store.error}</p>}

      {store.contactos.length === 0 ? (
        <p>No tienes contactos. ¡Agrega uno!</p>
      ) : (
        store.contactos.map(contacto => (
          <ContactCard
            key={contacto.id}
            contacto={contacto}
            onEliminar={manejarBorrado}
          />
        ))
      )}
    </div>
  );
}