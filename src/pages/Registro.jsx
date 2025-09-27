import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormRegistro from '../components/forms/FormRegistro';
import { useCreateUsuario } from '../hooks/usuarios.hooks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Registro() {
  
  const { mutate: createUsuario } = useCreateUsuario();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMail, setErrorMail] = useState(null);

  const navigate = useNavigate();
  
  const onSubmit = (data) => {
    setErrorMail(null);
    setIsSubmitting(true); 
    const usuarioData = { ...data };
    delete usuarioData.confirmarPassword;
    const rol = usuarioData.email.includes('@admin') ? 'admin' : 'user';
    const usuarioConRol = { ...usuarioData, rol };
    createUsuario(usuarioConRol, {
      onSuccess: () => {
        setTimeout(() => {
        navigate('/login', { state: { showSuccessToast: true } });
        }, 1000);
      },
      onError: (error) => {
        console.error('Error al crear usuario:', error);
        const errorBackEndMensaje = error.response?.data?.message;
        if (errorBackEndMensaje === 'El mail ya esta registrado') {
          setErrorMail(errorBackEndMensaje);
        } else {
          toast.error('No se pudo crear el usuario');
        }
        setIsSubmitting(false);
      },
    });
  };
  
  const handleCancel = () => navigate('/');

  return (
    <>
    <FormRegistro onSubmit={onSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} errorMail={errorMail} />
    <ToastContainer
      position="top-right"
      autoClose={3000} 
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
    />
  </>
  )
}
export default Registro;
