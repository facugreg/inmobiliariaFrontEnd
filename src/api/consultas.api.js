import axios from 'axios';
// acá solo muestro consultas que solo tengan el atributo respuesta vacio, desde le back
const PATH = 'http://localhost:3000/api/consultas';

export const getConsultas = async () => {
  const response = await axios.get(`${PATH}?condicion=true`, {withCredentials: true});
  return response.data.data;
};

export const createConsulta = async (data) => {
  return await axios.post(PATH, data, {withCredentials: true});
}

export const updateConsulta = async ({ id, ...data }) => {
  return await axios.put(`${PATH}/${id}`, data, {withCredentials: true});
};