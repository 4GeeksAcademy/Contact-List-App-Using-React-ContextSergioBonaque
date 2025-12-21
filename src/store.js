// src/store.js
export const initialState = {
  contactos: [],
  cargando: false,
  error: null,
};

export const reducer = (estado, accion) => {
  switch (accion.tipo) {
    case "CARGAR_CONTACTOS":
      return { ...estado, contactos: accion.contactos, cargando: false, error: null };
    case "AGREGAR_CONTACTO":
      return { ...estado, contactos: [...estado.contactos, accion.contacto] };
    case "ACTUALIZAR_CONTACTO":
      return {
        ...estado,
        contactos: estado.contactos.map(c => c.id === accion.contacto.id ? accion.contacto : c)
      };
    case "ELIMINAR_CONTACTO":
      return { ...estado, contactos: estado.contactos.filter(c => c.id !== accion.id) };
    case "EMPEZAR_CARGA":
      return { ...estado, cargando: true, error: null };
    case "ERROR_API":
      return { ...estado, cargando: false, error: accion.mensaje };
    default:
      return estado;
  }
};