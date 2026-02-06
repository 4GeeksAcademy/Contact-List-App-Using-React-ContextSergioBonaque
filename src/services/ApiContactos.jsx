// La URL DEBE incluir "/contact" para que la API de 4Geeks funcione
const BASE = "https://playground.4geeks.com"; 
const AGENDA = "milista-sergio-28"; 

export const obtenerContactos = async () => {
  try {
    const res = await fetch(`${BASE}/${AGENDA}/contacts`);
    
    // Si la agenda no existe (404), la creamos automáticamente
    if (res.status === 404) {
      console.log("Agenda no encontrada, creando...");
      await fetch(`${BASE}/${AGENDA}`, { method: "POST" });
      return []; // Retornamos lista vacía para evitar errores de .map()
    }
    
    if (!res.ok) throw new Error("No se pudieron cargar los contactos");
    
    const data = await res.json();
    return data.contacts || []; 
    
  } catch (error) {
    console.error("Error en obtenerContactos:", error);
    return []; // Siempre retornamos un array para evitar el error de 'name'
  }
};

export const crearContacto = async (contacto) => {
  const res = await fetch(`${BASE}/${AGENDA}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contacto),
  });
  if (!res.ok) throw new Error("Error al crear contacto");
  return await res.json();
};

export const actualizarContacto = async (contacto) => {
  // El ID debe ir al final de la URL según la documentación oficial
  const res = await fetch(`${BASE}/${AGENDA}/contacts/${contacto.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: contacto.name,
      email: contacto.email,
      phone: contacto.phone,
      address: contacto.address
    }),
  });
  if (!res.ok) throw new Error("Error al actualizar");
  return await res.json();
};

export const borrarContacto = async (id) => {
  const res = await fetch(`${BASE}/${AGENDA}/contacts/${id}`, { 
    method: "DELETE" 
  });
  if (!res.ok) throw new Error("Error al borrar");
  return true;
};
