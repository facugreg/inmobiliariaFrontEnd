import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const getPropietarios = async () => {
  const PATH = 'http://localhost:3000/api/propietarios';
  const response = await axios.get(PATH);
  return response.data.data; 
};

function usePropietarios() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["propietarios"],
    queryFn: getPropietarios,
    refetchOnWindowFocus: false,
  });

  return {
    propietarios: data || [], // devuelvo este array vacío si no hay data 
    isError,
    error,
    isLoading,
  };
}

export default usePropietarios;