import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductosContext } from '../context/ProductosContext';

export function FormularioPage() {
  const { agregarProducto } = useContext(ProductosContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ nombre: '', precio: '', categoria: 'Abarrotes' });
  const [errores, setErrores] = useState({});

  const validar = () => {
    let err = {};
    if (!form.nombre.trim()) err.nombre = 'El nombre es obligatorio';
    if (!form.precio || isNaN(form.precio) || Number(form.precio) <= 0) {
      err.precio = 'Ingrese un precio válido mayor a 0';
    }
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validar();
    if (Object.keys(err).length === 0) {
      agregarProducto({
        nombre: form.nombre,
        precio: `$${parseFloat(form.precio).toFixed(2)}`,
        categoria: form.categoria,
        imagen: ''
      });
      navigate('/');
    } else {
      setErrores(err);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '500px' }}>
      <div className="card shadow border-0 p-4">
        <h4 className="mb-3 text-success fw-bold">Agregar Producto</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre del Producto</label>
            <input 
              type="text" 
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Precio ($)</label>
            <input 
              type="number" 
              step="0.5"
              className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
            />
            {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Categoría</label>
            <select 
              className="form-select"
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            >
              <option value="Abarrotes">Abarrotes</option>
              <option value="Lácteos">Lácteos</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Panadería">Panadería</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">Guardar Producto</button>
        </form>
      </div>
    </div>
  );
}