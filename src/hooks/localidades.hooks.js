import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getLocalidades,
  getOneLocalidad,
  createLocalidad,
  updateLocalidad,
  deleteLocalidad,
} from '../api/localidades.api.js';

export const useLocalidades = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['localidades'],
    queryFn: getLocalidades,
    refetchOnWindowFocus: false,
  });

  return {
    localidades: data || [],
    isLoading,
    isError,
    error,
  };
};

export const useOneLocalidad = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['localidad', id],
    queryFn: () => getOneLocalidad(id),
  });
  return { data, isLoading, error };
};

export const useCreateLocalidad = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLocalidad,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['localidades'] }),
  });
};

export const useUpdateLocalidad = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLocalidad,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['localidades'] }),
  });
};

export const useDeleteLocalidad = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLocalidad,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['localidades'] }),
  });
};
