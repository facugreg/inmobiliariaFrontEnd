import { CButton, CCol, CContainer, CRow } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import usePropietarios  from './getPropietarioss.jsx';

export function Propietarios() {
  const navigate = useNavigate();
    const { error, isError, isLoading, propietarios } = usePropietarios();
    
    const deletePropietarios = async (id) => {
        console.log('por modificar propietario');
        navigate(`/deletePropietario/${id}`);
    };
    const updatePropietario = (id) => {
        console.log('por modificar propietario');
        navigate(`/updatePropietario/${id}`);
    };
    const handleAgregar= () =>{
        console.log('por agregar nuevo propietario')
        navigate('/addPropietario')
    }
    if (isLoading) {
        return <p>Cargando propietarios...</p>;
    }

    if (isError) {
        return <p>Error al cargar propietarios: {error.message}</p>;
    }

    if (!propietarios || propietarios.length === 0) {
        return <p>No se encontraron propietarios.</p>;
    }

  
  return (
    <>
    <CContainer>
    <h2 className="my-3">Lista de Propietarios</h2>
    <CButton
    color="primary" 
    size="sm"
    onClick={handleAgregar}
    >
    Agregar propietario
    </CButton>
    {propietarios.length === 0 ? (
      <p>No hay propietarios cargados.</p>
    ) : (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Mail</th>
          </tr>
        </thead>
        <tbody>
          {propietarios.map((prop) => (
            <tr key={prop.id}>
              <td>{prop.id}</td>
              <td>{prop.nombrePropietario}</td>
              <td>{prop.mailPropietario}</td>
              <td>
                <CButton 
                  color="warning" 
                  size="sm" 
                  className="me-2"
                  onClick={() => updatePropietario(prop.id)}
                >
                  Editar
                </CButton>
                <CButton 
                  color="danger" 
                  size="sm"
                  onClick={() => deletePropietarios(prop.id)}
                >
                  Eliminar
                </CButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </CContainer>
        </>
  )
}
