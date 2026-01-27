import {
  createVisita,
  deleteVisita,
  getVisitas,
  updateVisita,
} from '../api/visita.api';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
export const useVisitas = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['visitas'],
    queryFn: getVisitas,
    refetchOnWindowFocus: false,
  });
  const visitasParaListar = data
    ? data.map((v) => ({
        ...v,
        datevisita: v.datevisita
          ? v.datevisita.split('T')[0].split('-').reverse().join('/')
          : 'N/A',
        direccion: v.inmueble
          ? `${v.inmueble.direccionCalle} ${v.inmueble.direccionNumero}`
          : 'N/A',
        nombreUsuario: v.usuario
          ? `${v.usuario.nombre} ${v.usuario.apellido}`
          : 'N/A',
      }))
    : [];
  return {
    visitas: visitasParaListar,
    isLoading,
    isError,
    error,
  };
};
export const useCreateVisita = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVisita,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['visitas'] }),
  });
};
export const useDeleteVisita = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVisita,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['visitas'] }),
  });
};

export const useUpdateVisita = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVisita,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['visitas'] }),
  });
};
