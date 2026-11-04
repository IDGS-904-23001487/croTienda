import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success mb-4 shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Tienda Dreamboy</Link>
        <div className="d-flex align-items-center gap-3">
          {usuario ? (
            <>
              <Link className="btn btn-outline-light btn-sm" to="/">Catálogo</Link>
              <Link className="btn btn-outline-light btn-sm" to="/nuevo">Nuevo Producto</Link>
              <span className="text-white small">Hola, <strong>{usuario.nombre}</strong></span>
              <button onClick={handleLogout} className="btn btn-danger btn-sm">Salir</button>
            </>
          ) : (
            <Link className="btn btn-light btn-sm" to="/login">Iniciar Sesión</Link>
          )}
        </div>
      </div>
    </nav>
  );
}