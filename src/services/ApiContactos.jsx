// READ - Obtener contactos
export const obtenerContactos = async () => {
    try {
        const res = await fetch("https://playground.4geeks.com");
        if (res.status === 404) {
            await fetch("https://playground.4geeks.com", { method: "POST" });
            return [];
        }
        const data = await res.json();
        return data.contacts || [];
    } catch (error) {
        return [];
    }
};

// CREATE - Crear contacto
export const crearContacto = async (contacto) => {
    // La URL debe ser completa hasta /contacts
    const res = await fetch("https://playground.4geeks.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contacto),
    });
    if (!res.ok) throw new Error("Error al crear");
    return await res.json();
};

// UPDATE - Actualizar contacto
export const actualizarContacto = async (contacto) => {
    const res = await fetch(`https://playground.4geeks.com/${contacto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contacto),
    });
    if (!res.ok) throw new Error("Error al actualizar");
    return await res.json();
};

// DELETE - Borrar contacto
export const borrarContacto = async (id) => {
    const res = await fetch(`https://playground.4geeks.com/${id}`, { 
        method: "DELETE" 
    });
    if (!res.ok) throw new Error("Error al borrar");
    return true;
};
