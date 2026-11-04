import { useState, useEffect, useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import { TarjetaProducto } from '../components/TarjetaProducto';
import '../components/WebComponentBanner';

export function CatalogoPage() {
  const { state } = useContext(ProductosContext);
  const [contador, setContador] = useState(3);
  const [cargandoConPausa, setCargandoConPausa] = useState(true);

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

  return (
    <div className="container">
      {}
      <banner-oferta texto="¡Arovecha 20% de descuento en Lácteos esta semana!" />

      {cargandoConPausa || state.cargando ? (
        <div className="text-center my-5 py-5">
          <div className="spinner-border text-success mb-3" style={{ width: '3rem', height: '3rem' }}></div>
          <h3 className="text-secondary fw-bold">Cargando catálogo en...</h3>
          <h4 className="display-1 text-success fw-bold">{contador}</h4>
        </div>
      ) : (
        <div className="row">
          {state.productos.map((prod) => (
            <TarjetaProducto key={prod.id} producto={prod} />
          ))}
        </div>
      )}
    </div>
  );
}