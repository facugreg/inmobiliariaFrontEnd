import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUsuarios,
  getOneUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario,
} from '../api/usuarios.api.js';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext.js';

export const useUsuarios = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['usuarios'],
    queryFn: getUsuarios,
  });
  return { usuarios: data, isLoading, error };
};

export const useOneUsuario = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['usuario', id],
    queryFn: () => getOneUsuario(id),
  });
  return { data, isLoading, error };
};

export const useCreateUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};

export const useUpdateUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUsuario,
    onSuccess: (updatedUser, variables) => {
      queryClient.setQueryData(['usuario', variables.id], updatedUser);
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};

export const useDeleteUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};

export const useLoginUsuario = () => {
  return useMutation({
    mutationFn: loginUsuario,
  });
};

// Hook para acceder al contexto de autenticación, obtener el usuario actual
export const useAuth = () => useContext(AuthContext);