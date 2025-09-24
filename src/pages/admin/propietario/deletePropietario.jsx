import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CButton, CContainer } from '@coreui/react';

const deletePropietarioApi = async (id) => {
  const PATH = 'http://localhost:3000/api/propietarios';
  const response = await axios.delete(`${PATH}/${id}`);
  return response.data.data;
};

export default function DeletePropietario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (id) => deletePropietarioApi(id),
    onSuccess: () => {
      // refresca la cache de propietarios
      queryClient.invalidateQueries(['propietarios']);
      navigate('/propietarios');
    },
    onError: (err) => {
      console.error(`Error al eliminar propietario: ${err.message}`);
    },
  });

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <CContainer className="my-5">
      <h2>Eliminar Propietario</h2>
      <p>
        ¿Estás seguro que querés eliminar el propietario con ID <b>{id}</b>?
      </p>

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
        onClick={() => navigate('/propietarios')}
        disabled={isLoading}
      >
        Cancelar
      </CButton>
    </CContainer>
  );
}