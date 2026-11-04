import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { CatalogoPage } from './pages/CatalogoPage';
import { FormularioPage } from './pages/FormularioPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

function RutaProtegida({ children }) {
  const { usuario } = useContext(AuthContext);
  return usuario ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/" 
          element={
            <RutaProtegida>
              <CatalogoPage />
            </RutaProtegida>
          } 
        />
        <Route 
          path="/nuevo" 
          element={
            <RutaProtegida>
              <FormularioPage />
            </RutaProtegida>
          } 
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}