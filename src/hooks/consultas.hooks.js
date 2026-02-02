import { useQuery } from '@tanstack/react-query';
import { getConsultas } from '../api/consultas.api.js';

export function useConsultas() {
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