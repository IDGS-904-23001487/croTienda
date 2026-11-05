import { createContext, useReducer, useEffect } from 'react';
import { productosReducer, initialState } from '../reducers/productosReducer';

export const ProductosContext = createContext();

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const MIS_IMAGENES = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaIviQx7yWozJosB5dh7VmQyAyXIz4FtCLDdsKnPmP2g&s=10', 
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREUjsxY4psB5LLl1Talba449WewaCEpiv6v_iPTnDzyA&s',    
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Ji9mEXYq2CARV3TH4iJJlZ0bw-qLfT45E6LK0lvogQ&s=10', 
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9FBnTfvFirJIx-9F3H6Z7peoxQVbuPInjYE3h5LaGBQ&s=10'  
];

export function ProductosProvider({ children }) {
  const [state, dispatch] = useReducer(productosReducer, initialState);

  useEffect(() => {
    const obtenerProductos = async () => {
      const productosGuardados = localStorage.getItem('productos_pwa');

      if (productosGuardados) {
        dispatch({ type: 'CARGAR_EXITO', payload: JSON.parse(productosGuardados) });
      } else {
        try {
          const respuesta = await fetch(`${API_URL}?_limit=4`);
          const datos = await respuesta.json();

          const formateados = datos.map((item, index) => ({
            id: item.id,
            nombre: index === 0 ? 'Leche' : index === 1 ? 'Coca Cola' : index === 2 ? 'Sabritas' : 'Pan Blanco',
            precio: `$${(index + 1) * 15}.00`,
            categoria: index === 0 ? 'Lácteos' : index === 1 ? 'Bebidas' : index === 2 ? 'Botanas' : 'Panadería',
            imagen: MIS_IMAGENES[index] || ''
          }));

          localStorage.setItem('productos_pwa', JSON.stringify(formateados));
          dispatch({ type: 'CARGAR_EXITO', payload: formateados });
        } catch (err) {
          dispatch({ type: 'ERROR', payload: 'Error al conectar con la API' });
        }
      }
    };

    obtenerProductos();
  }, []);

  const agregarProducto = async (nuevoProducto) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      });
      const data = await res.json();

      const productoFinal = {
        ...nuevoProducto,
        id: Date.now(),
        imagen: nuevoProducto.imagen || ''
      };

      const listaActualizada = [...state.productos, productoFinal];
      localStorage.setItem('productos_pwa', JSON.stringify(listaActualizada));
      dispatch({ type: 'AGREGAR_PRODUCTO', payload: productoFinal });
    } catch (e) {
      console.error(e);
    }
  };

  const editarProducto = async (productoEditado) => {
    try {
      await fetch(`${API_URL}/${productoEditado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEditado),
      });

      const listaActualizada = state.productos.map((p) =>
        p.id === productoEditado.id ? productoEditado : p
      );

      localStorage.setItem('productos_pwa', JSON.stringify(listaActualizada));
      dispatch({ type: 'EDITAR_PRODUCTO', payload: productoEditado });
    } catch (e) {
      console.error(e);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const listaActualizada = state.productos.filter((p) => p.id !== id);
      
      localStorage.setItem('productos_pwa', JSON.stringify(listaActualizada));
      dispatch({ type: 'ELIMINAR_PRODUCTO', payload: id });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ProductosContext.Provider value={{ state, dispatch, agregarProducto, editarProducto, eliminarProducto }}>
      {children}
    </ProductosContext.Provider>
  );
}