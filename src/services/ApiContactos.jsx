// Definimos la base de tu agenda específica para no repetir código
const BASE_URL = "https://playground.4geeks.com";

// READ - Obtener contactos
export const obtenerContactos = async () => {
    try {
        const res = await fetch(BASE_URL);
        
        // Si por alguna razón la agenda se borrara (404), la intentamos crear
        if (res.status === 404) {
            await fetch(BASE_URL, { method: "POST" });
            return [];
        }

        const data = await res.json();
        // La API devuelve un objeto que contiene una propiedad 'contacts'
        return data.contacts || [];
    } catch (error) {
        console.error("Error al obtener contactos:", error);
        return [];
    }
};

// CREATE - Crear contacto
export const crearContacto = async (contacto) => {
    // IMPORTANTE: Para crear es BASE_URL + "/contacts"
    const res = await fetch(`${BASE_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contacto),
    });
    
    if (!res.ok) throw new Error("Error al crear el contacto");
    return await res.json();
};

// UPDATE - Actualizar contacto
export const actualizarContacto = async (contacto) => {
    // La URL debe incluir el ID del contacto al final
    const res = await fetch(`${BASE_URL}/contacts/${contacto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contacto),
    });
    
    if (!res.ok) throw new Error("Error al actualizar");
    return await res.json();
};

// DELETE - Borrar contacto
export const borrarContacto = async (id) => {
    // La URL debe incluir el ID del contacto al final
    const res = await fetch(`${BASE_URL}/contacts/${id}`, { 
        method: "DELETE" 
    });
    
    if (!res.ok) throw new Error("Error al borrar");
    return true;
};
