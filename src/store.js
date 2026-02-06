export const initialStore = () => {
  return {
    contactos: [],
    loading: false
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "SET_CONTACTOS":
      return { ...store, contactos: action.payload, loading: false };
    case "ADD_CONTACTO":
      return { ...store, contactos: [...store.contactos, action.payload] };
    case "UPDATE_CONTACTO": 
      return {
        ...store,
        contactos: store.contactos.map(c => 
          c.id === action.payload.id ? action.payload : c
        )
      };
    case "DELETE_CONTACTO":
      return {
        ...store,
        contactos: store.contactos.filter(c => c.id !== action.payload)
      };
    case "START_LOADING":
      return { ...store, loading: true };
    default:
      return store; 
  }
};
