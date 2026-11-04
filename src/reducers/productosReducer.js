export const initialState = {
  productos: [],
  cargando: true,
  error: null,
};

export function productosReducer(state, action) {
  switch (action.type) {
    case 'CARGAR_EXITO':
      return { ...state, productos: action.payload, cargando: false };
    case 'AGREGAR_PRODUCTO':
      return { ...state, productos: [...state.productos, action.payload] };
    case 'ELIMINAR_PRODUCTO':
      return {
        ...state,
        productos: state.productos.filter((p) => p.id !== action.payload),
      };
    case 'ERROR':
      return { ...state, error: action.payload, cargando: false };
    default:
      return state;
  }
}