const BASE = " https://playground.4geeks.com/contact/";
const AGENDA = "milista-sergio-28"; 

export const obtenerContactos = async () => {
  const res = await fetch(`${BASE}/agenda/${AGENDA}`);
  if (!res.ok) throw new Error("No se pudieron cargar los contactos");
  const data = await res.json();
  return data.contacts || [];
};
// corregir en la mentoria
export const crearContacto = async (contacto) => {
  const res = await fetch(`${BASE}/agenda/${AGENDA}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contacto),
  });
  if (!res.ok) throw new Error("Error al crear contacto");
  return res.json();
};

export const actualizarContacto = async (contacto) => {
  const res = await fetch(`${BASE}/contact/${contacto.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contacto),
  });
  if (!res.ok) throw new Error("Error al actualizar");
  return res.json();
};

export const borrarContacto = async (id) => {
  const res = await fetch(`${BASE}/contact/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al borrar");
  return true;
};