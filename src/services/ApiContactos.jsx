// mi error: La URL debe incluir la aplicación /contact/ y tu agenda /agendas/slug
const BASE_URL = "https://playground.4geeks.com/contact";
const slug = "milista-sergio-28"

// Obtener contactos
export const obtenerContactos = async () => {
    try {
        const res = await fetch(`${BASE_URL}/agendas/${slug}/contacts`); // Añadido /contacts
        
        const data = await res.json();
        return data.contacts || [];
    } catch (error) {
        console.error("Error al obtener contactos:", error);
        return [];
    }
};

// Crear contacto
export const crearContacto = async (contacto) => {
    const res = await fetch(`${BASE_URL}/agendas/${slug}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contacto),
    });
    
    if (!res.ok) throw new Error("Error al crear el contacto");
    return await res.json();
};

// Actualizar contacto
export const actualizarContacto = async (contacto) => {
    // La URL debe ser /contacts/{id}
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
    const res = await fetch(`${BASE_URL}/contacts/${id}`, { 
        method: "DELETE" 
    });
    
    if (!res.ok) throw new Error("Error al borrar");
    return true;
};
