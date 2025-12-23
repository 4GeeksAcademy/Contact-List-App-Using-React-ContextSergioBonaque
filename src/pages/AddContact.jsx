import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { crearContacto, actualizarContacto, obtenerContactos } from "../services/ApiContactos";

export default function AddContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (id) {
      const contacto = store.contactos.find(c => c.id == id);
      if (contacto) setForm(contacto);
    }
  }, [id, store.contactos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await actualizarContacto(form);
      } else {
        await crearContacto(form);
      }
      const contactos = await obtenerContactos();
      dispatch({ tipo: "CARGAR_CONTACTOS", contactos });
      navigate("/");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>{id ? "Editar contacto" : "Nuevo contacto"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="Nombre completo"
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Teléfono"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Dirección"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{
            background: "#3498db",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          {id ? "Guardar" : "Crear"}
        </button>
        <button type="button" onClick={() => navigate("/")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}