import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export function LoginPage() {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError('Por favor ingresa un nombre de usuario.');
      return;
    }

    // Obliga a escribir algo en la contraseña (mínimo 4 caracteres), pero no valida credenciales fijas
    if (!password.trim() || password.length < 4) {
      setError('La contraseña es obligatoria (mínimo 4 caracteres).');
      return;
    }

    setError('');
    login(nombre); // Inicia sesión con cualquier nombre/contraseña ingresada
    navigate('/');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="card shadow p-4 border-0">
        <h3 className="text-center text-success mb-3 fw-bold">Acceso a la Tienda</h3>
        
        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de Usuario</label>
            <input 
              type="text" 
              className="form-control" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              placeholder=""
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder=""
              required 
            />
          </div>

          <button type="submit" className="btn btn-success w-100 fw-bold">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}