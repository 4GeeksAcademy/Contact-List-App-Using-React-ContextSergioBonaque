export const initialStore = {
  contactos: [],
  loading: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTOS":
      return { ...state, contactos: action.payload, loading: false };
    case "ADD_CONTACTO":
      return { ...state, contactos: [...state.contactos, action.payload] };
    case "DELETE_CONTACTO":
      return {
        ...state,
        contactos: state.contactos.filter(c => c.id !== action.payload)
      };
    case "START_LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
};