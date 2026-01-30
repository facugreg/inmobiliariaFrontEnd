import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../hooks/usuarios.hooks';
import FormLogin from '../components/forms/FormLogin';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const {login} = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const onCancel = () => {
    navigate('/');
  };

  useEffect(() => {
    if (location.state?.showSuccessToast) {
      toast.success('Usuario creado correctamente!');
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  //const loginMutation = useLoginUsuario();

  const onSubmit = async (data) => {
    // loginMutation.mutate(data, {
    //   onSuccess: (user) => {
    //     handleLogin(user.rol || 'guest', user.id || null);
    //     navigate('/');
    //   },
    // });
    setLoading(true);
    setError(false);
    try {
      await login(data.email, data.password); // esto setea user adentro
      navigate('/');
    } catch {
      toast.error("Credenciales incorrectas");
      setError(true);
    }
  };

  return (
    <>
      <FormLogin
        onSubmit={onSubmit}
        onCancel={onCancel}
        loading={loading}
        error={error}
        //loginMutation={loginMutation}
      />
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </>
  );
}

export default Login;
