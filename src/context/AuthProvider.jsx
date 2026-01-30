import { useEffect, useState } from 'react';
import { getAuthUsuario, loginUsuario, logoutUsuario } from '../api/usuarios.api.js';
import { AuthContext } from './authContext.js';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, rol, email }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuthUsuario()
      .then(userData => {
        setUser(userData);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fetchUser = async() => {
    try{
      const userData = await getAuthUsuario();
      setUser(userData);
    } catch {
      setUser(null);
    }
  }
  const login = async (email, password) => {
      
    await loginUsuario({ email, password });
    //necesario para obtener el usuario autenticado (token)
    // try{
    //   const res = await getAuthUsuario();
    //   setUser(res.data.data);
    // } catch {
    //   setUser(null);
    // } 
    await fetchUser();
  };

  // Logout: borrar cookie y limpiar user
  const logout = async () => {
      
    await logoutUsuario(); //borra cookie en backend
    setUser(null);
  };
  return (
    //todo lo que expongo en el value es accesible desde useContext(AuthContext), haciendo const [user, loading] = useAuth() lo obtengo
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


