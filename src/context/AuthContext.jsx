import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario_pwa');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = (nombreUsuario) => {
    const userObj = { nombre: nombreUsuario, logueado: true };
    localStorage.setItem('usuario_pwa', JSON.stringify(userObj));
    setUsuario(userObj);
  };

  const logout = () => {
    localStorage.removeItem('usuario_pwa');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}