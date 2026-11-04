import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="text-center py-5 my-5">
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <h2 className="fw-bold">Página No Encontrada</h2>
      <p className="text-muted">La ruta a la que intentas acceder no existe.</p>
      <Link to="/" className="btn btn-success mt-3">Volver al Inicio</Link>
    </div>
  );
}