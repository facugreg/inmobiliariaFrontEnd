import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useOneUsuario, useUpdateUsuario, useDeleteUsuario } from '../hooks/usuarios.hooks.js';
import FormPerfil from '../components/forms/FormPerfil.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalEliminar from '../components/modals/ModalEliminar.jsx';

export default function Perfil({ userId, handleLogout }) {

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMail, setErrorMail] = useState(null);
  const [visibleEliminar, setVisibleEliminar] = useState(false);

  const { data: user, isLoading, error } = useOneUsuario(userId);
  const {mutate: updateUsuario} = useUpdateUsuario();
  const {mutate: deleteUsuario} = useDeleteUsuario();
  
  if (isLoading) return <div>Cargando...</div>;
  if (error) {
    console.log(error);
    return <div>Error al cargar el perfil.</div>;
  }

  const handleUpdate = (updatedUser) => {
    setIsSubmitting(true);
    setErrorMail(null);
    const updateUserComplete = { ...updatedUser, id: user.id, rol: user.rol, password: user.password };
    updateUsuario(updateUserComplete, {
      onSuccess: () => {
        setTimeout(() => {
          setIsSubmitting(false);
          toast.success('Perfil actualizado con éxito');
        }, 1000);
      },
      onError: (error) => {
        console.error('Error al actualizar el perfil:', error);
        const errorBackEndMensaje = error.response?.data?.message;
        if (errorBackEndMensaje === 'El mail ya esta registrado') {
          setErrorMail(errorBackEndMensaje);
        } else {
          toast.error('No se pudo actualizar el perfil');
        }
        setIsSubmitting(false);
      },
    });
  };

  const handleDelete = () => {
    setVisibleEliminar(true);
  }

  const handleConfirm = () => {
    deleteUsuario(userId, {
      onSuccess: () => {
        setVisibleEliminar(false);
        navigate('/'); 
        handleLogout();
      },
      onError: (error) => {
        console.error('Error al eliminar el usuario:', error);
        toast.error('No se pudo eliminar el usuario');
      },
    });
  };

  return (
    <>
    <FormPerfil user={user} onUpdate={handleUpdate} isSubmitting={isSubmitting} errorMail={errorMail} onDelete={handleDelete} />
    <ModalEliminar
      visibleEliminar={visibleEliminar}
      setVisibleEliminar={setVisibleEliminar}
      handleConfirm={handleConfirm}
      titulo = "usuario"
    />
    <ToastContainer
      position="top-right"
      autoClose={3000} 
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
    />
    </>
  );
}