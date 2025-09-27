import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const getInmuebles = async (tipoInmueble, query) => {
  const PATH = 'http://localhost:3000/api/inmuebles';
  const response = await axios.get(PATH, {
  params: { tipo: tipoInmueble, calle: query } });
  return response.data.data; 
};

function useInmuebles({tipoInmueble, query}) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["inmuebles", tipoInmueble, query],
    queryFn: () => getInmuebles(tipoInmueble, query),
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