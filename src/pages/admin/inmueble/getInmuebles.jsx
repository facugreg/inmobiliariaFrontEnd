import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getInmuebles = async (tipoInmueble, localidad, query, precioDolar) => {
  const PATH = 'http://localhost:3000/api/inmuebles';
  const params = {};
  
  // Solo agrega los parámetros que tienen valor
  if (tipoInmueble) params.tipo = tipoInmueble;
  if (localidad) params.localidad = localidad;
  if (query) params.calle = query;
  if (precioDolar) params.precioDolar = precioDolar;
  
  const response = await axios.get(PATH, { params });
  return response.data.data;
};

function useInmuebles({ tipoInmueble, localidad, query, precioDolar }) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['inmuebles', tipoInmueble, localidad, query, precioDolar],
    queryFn: () => getInmuebles(tipoInmueble, localidad, query, precioDolar),
    refetchOnWindowFocus: false,
  });

  return {
    inmuebles: data || [], // devuelvo este array vacío si no hay data
    isError,
    error,
    isLoading,
  };
}

export default useInmuebles;
