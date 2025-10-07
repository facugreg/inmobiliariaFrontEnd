import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useLoginUsuario } from '../hooks/usuarios.hooks';
import FormLogin from '../components/forms/FormLogin';

function Login({ handleLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const onCancel = () => {
    navigate('/');
  };

  useEffect(() => {
    if (location.state?.showSuccessToast) {
      toast.success('Usuario creado correctamente!');
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const loginMutation = useLoginUsuario();

  const onSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (user) => {
        handleLogin(user.rol || 'guest', user.id || null);
        navigate('/');
      },
    });
  };

  return (
    <>
      <FormLogin
        onSubmit={onSubmit}
        onCancel={onCancel}
        loginMutation={loginMutation}
      />
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </>
  );
}

export default Login;
