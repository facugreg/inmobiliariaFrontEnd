import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getInmuebles = async (tipoInmueble, localidad, query) => {
  const PATH = 'http://localhost:3000/api/inmuebles';
  const response = await axios.get(PATH, {
    params: { tipo: tipoInmueble, calle: query, localidad: localidad },
  });
  return response.data.data;
};

function useInmuebles({ tipoInmueble, localidad, query }) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['inmuebles', tipoInmueble, localidad, query],
    queryFn: () => getInmuebles(tipoInmueble, localidad, query),
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
