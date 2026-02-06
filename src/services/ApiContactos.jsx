const BASE = "https://playground.4geeks.com"; // Sin el / al final para evitar dobles slashes
const AGENDA = "milista-sergio-28"; 

export const obtenerContactos = async () => {
  // Nota: La ruta es /agendas/{slug}/contacts
  const res = await fetch(`${BASE}/agendas/${AGENDA}/contacts`);
  
  if (res.status === 404) {
    // Si la agenda no existe, la API devuelve 404. 
    // Podrías llamar a una función para crear la agenda aquí.
    return []; 
  }
  
  if (!res.ok) throw new Error("No se pudieron cargar los contactos");
  const data = await res.json();
  return data.contacts || [];
};

export const crearContacto = async (contacto) => {
  const res = await fetch(`${BASE}/agendas/${AGENDA}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contacto),
  });
  if (!res.ok) throw new Error("Error al crear contacto");
  return res.json();
};

export const actualizarContacto = async (contacto) => {
  // El ID va al final de la ruta de contactos de esa agenda
  const res = await fetch(`${BASE}/agendas/${AGENDA}/contacts/${contacto.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contacto),
  });
  if (!res.ok) throw new Error("Error al actualizar");
  return res.json();
};

export const borrarContacto = async (id) => {
  const res = await fetch(`${BASE}/agendas/${AGENDA}/contacts/${id}`, { 
    method: "DELETE" 
  });
  if (!res.ok) throw new Error("Error al borrar");
  return true;
};
