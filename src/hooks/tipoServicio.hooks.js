import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTipoServicios,
  getOneTipoServicio,
  createTipoServicio,
  updateTipoServicio,
  deleteTipoServicio,
} from '../api/tipoServicio.api.js';

export const useTipoServicios = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tiposervicios'],
    queryFn: getTipoServicios,
  });
  return { tiposervicios: data || [], isLoading, error };
};

export const useOneTipoServicio = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tipoServicio', id],
    queryFn: () => getOneTipoServicio(id),
  });
  return { data, isLoading, error };
};

export const useCreateTipoServicio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTipoServicio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tiposervicios'] });
    },
  });
};

export const useUpdateTipoServicio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTipoServicio,
    onSuccess: (updatedTipoServicio, variables) => {
      queryClient.setQueryData(['tipoServicio', variables.id], updatedTipoServicio);
      queryClient.invalidateQueries({ queryKey: ['tiposervicios'] });
    },
  });
};

export const useDeleteTipoServicio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTipoServicio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tiposervicios'] });
    },
  });
};
