import { useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import { useCount } from '../hooks/useCount';

export function TarjetaProducto({ producto }) {
  const { eliminarProducto } = useContext(ProductosContext);
  const { count, increment, decrement } = useCount(1, 1, 10);

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img 
          src={producto.imagen} 
          className="card-img-top" 
          alt={producto.nombre} 
          style={{ height: '180px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <span className="badge bg-secondary mb-2">{producto.categoria}</span>
            <h5 className="card-title fw-bold">{producto.nombre}</h5>
            <p className="fs-5 fw-bold text-success">{producto.precio}</p>
          </div>

          <div className="mt-2">
            <label className="form-label small fw-bold">Cantidad:</label>
            <div className="d-flex align-items-center gap-2 mb-3">
              <button className="btn btn-sm btn-outline-secondary" onClick={decrement}>-</button>
              <span className="fw-bold">{count}</span>
              <button className="btn btn-sm btn-outline-secondary" onClick={increment}>+</button>
            </div>
            
            <button 
              className="btn btn-danger btn-sm w-100" 
              onClick={() => eliminarProducto(producto.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}