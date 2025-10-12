import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPropietarios,
  getOnePropietario,
  createPropietario,
  updatePropietario,
  deletePropietario,
} from '../api/propietarios.api.js';

export const usePropietarios = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['propietarios'],
    queryFn: getPropietarios,
  });
  return { propietarios: data || [], isLoading, error };
};

export const useOnePropietario = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['propietario', id],
    queryFn: () => getOnePropietario(id),
  });
  return { data, isLoading, error };
};

export const useCreatePropietario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPropietario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['propietarios'] });
    },
  });
};

export const useUpdatePropietario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePropietario,
    onSuccess: (updatedPropietario, variables) => {
      queryClient.setQueryData(['propietario', variables.id], updatedPropietario);
      queryClient.invalidateQueries({ queryKey: ['propietarios'] });
    },
  });
};

export const useDeletePropietario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePropietario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['propietarios'] });
    },
  });
};
