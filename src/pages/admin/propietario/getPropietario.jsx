import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getPropietario = async (id) => {
  const response = await axios.get(`http://localhost:3000/api/propietarios/${id}`);
  return response.data.data;
};

export default function usePropietario(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['propietario', id],
    queryFn: () => getPropietario(id),
    enabled: !!id, // solo ejecutar si id existe
    refetchOnWindowFocus: false,
  });

  return { propietario: data, isLoading, isError, error };
}
