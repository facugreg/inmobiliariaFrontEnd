import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getInmueble = async (id) => {
  const response = await axios.get(`http://localhost:3000/api/inmuebles/${id}`);
  console.log(response.data)
  return response.data.data;
};

export default function useInmueble(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['inmueble', id],
    queryFn: () => getInmueble(id),
    enabled: !!id, // solo ejecutar si id existe
    refetchOnWindowFocus: false,
  });
  
  return { inmueble: data, isLoading, isError, error };
}