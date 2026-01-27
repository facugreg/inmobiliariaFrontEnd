import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// acá solo muestro consultas que solo tengan el atributo respuesta vacio, desde le back
const getConsultas = async () => {
  const PATH = 'http://localhost:3000/api/consultas?condicion=true';
  const response = await axios.get(PATH, {withCredentials: true});
  return response.data.data;
};

function useConsultas() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['consultas'],
    queryFn: () => getConsultas(),
    refetchOnWindowFocus: false,
  });

  return {
    consultas: data || [],
    isError,
    error,
    isLoading,
  };
}

export default useConsultas;