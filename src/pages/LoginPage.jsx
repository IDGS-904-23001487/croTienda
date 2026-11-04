import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export function LoginPage() {
  const [nombre, setNombre] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim()) {
      login(nombre);
      navigate('/');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="card shadow p-4 border-0">
        <h3 className="text-center text-success mb-3 fw-bold">Acceso a la Tienda</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de Usuario</label>
            <input 
              type="text" 
              className="form-control" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              placeholder="Ej. Juan Pérez"
              required 
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Ingresar</button>
        </form>
      </div>
    </div>
  );
}