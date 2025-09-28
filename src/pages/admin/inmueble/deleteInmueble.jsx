import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CButton, CContainer } from '@coreui/react';

const deleteInmuebleApi = async (id) => {
  const PATH= 'http://localhost:3000/api/inmuebles';
  const response = await axios.delete(`${PATH}/${id}`);
  return response.data.data;
};

export default function DeleteInmueble() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (id) => deleteInmuebleApi(id),
    onSuccess: () => {
        // refresca la cache de inmuebles
        queryClient.invalidateQueries(['inmuebles']);
        navigate('/inmuebles');
    },
    onError: (err) => {
        console.error(`Error al eliminar inmueble: ${err.message}`);
    },
    });
    
      const handleDelete = () => {
        mutate(id);
      };


    return (
    <CContainer className="my-5">
      <h2>Eliminar inmueble</h2>
      <p>
        ¿Estás seguro que querés eliminar el inmueble con ID <b>{id}</b>?
      </p>
      <h5> No podrá recuperarlo luego de confirmar</h5>

      {isError && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      <CButton
        color="danger"
        onClick={handleDelete}
        disabled={isLoading}
        className="me-2"
      >
        {isLoading ? 'Eliminando...' : 'Sí, eliminar'}
      </CButton>

      <CButton
        color="secondary"
        onClick={() => navigate('/inmuebles')}
        disabled={isLoading}
      >
        Cancelar
      </CButton>
    </CContainer>
  );
}