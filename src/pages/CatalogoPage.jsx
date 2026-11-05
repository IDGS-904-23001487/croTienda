import { useState, useEffect, useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import { TarjetaProducto } from '../components/TarjetaProducto';
import '../components/WebComponentBanner';

export function CatalogoPage() {
  const { state } = useContext(ProductosContext);
  const [contador, setContador] = useState(3);
  const [cargandoConPausa, setCargandoConPausa] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const intervalo = setInterval(() => {
      setContador((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const timer = setTimeout(() => {
      setCargandoConPausa(false);
      clearInterval(intervalo);
    }, 3000);

    return () => {
      clearInterval(intervalo);
      clearTimeout(timer);
    };
  }, []);

  const productosFiltrados = state.productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    prod.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container">
      <banner-oferta texto="¡Aprovecha 20% de descuento en Lácteos esta semana!" />

      {}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <input 
            type="text" 
            className="form-control form-control-lg shadow-sm"
            placeholder="Buscar por nombre o categoría"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {cargandoConPausa || state.cargando ? (
        <div className="text-center my-5 py-5">
          <div className="spinner-border text-success mb-3" style={{ width: '3rem', height: '3rem' }}></div>
          <h3 className="text-secondary fw-bold">Cargando catálogo en:</h3>
          <h4 className="display-1 text-success fw-bold">{contador}</h4>
        </div>
      ) : (
        <div className="row">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((prod) => (
              <TarjetaProducto key={prod.id} producto={prod} />
            ))
          ) : (
            <div className="text-center py-4">
              <p className="fs-5 text-muted">No se encontraron productos que coincidan con "{busqueda}".</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}