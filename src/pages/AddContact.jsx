import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { crearContacto, actualizarContacto, obtenerContactos } from "../services/ApiContactos";

export default function AddContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  // pendiente de mentoria
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Rellenar el formulario si estamos editando
  useEffect(() => {
    if (id && store.contactos.length > 0) {
      const contacto = store.contactos.find(c => c.id == id);
      if (contacto) {
        setForm({
          name: contacto.name || "",
          email: contacto.email || "",
          phone: contacto.phone || "",
          address: contacto.address || ""
        });
      }
    }
  }, [id, store.contactos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "START_LOADING" }); // Opcional: activar spinner
    
    try {
      if (id) {
        // Para actualizar, necesitamos el ID y los datos
        await actualizarContacto({ ...form, id: id });
      } else {
        await crearContacto(form);
      }
      
      // Sincronizamos el Context API con los datos frescos del servidor
      const contactosActualizados = await obtenerContactos();
      dispatch({ type: "SET_CONTACTOS", payload: contactosActualizados });
      
      navigate("/");
    } catch (err) {
      alert("Error en la operación: " + err.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">{id ? "Editar contacto" : "Añadir nuevo contacto"}</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Nombre Completo</label>
          <input
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            placeholder="Introduce el nombre"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            placeholder="Introduce el email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            name="phone"
            className="form-control"
            value={form.phone}
            onChange={handleChange}
            placeholder="Introduce el teléfono"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            name="address"
            className="form-control"
            value={form.address}
            onChange={handleChange}
            placeholder="Introduce la dirección"
            required
          />
        </div>
        
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            {id ? "Actualizar" : "Guardar"}
          </button>
          <button type="button" className="btn btn-link text-secondary" onClick={() => navigate("/")}>
            o volver a contactos
          </button>
        </div>
      </form>
    </div>
  );
}
