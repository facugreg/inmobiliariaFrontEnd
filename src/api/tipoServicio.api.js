import axios from 'axios';

const PATH = 'http://localhost:3000/api/tiposervicios';

export const getTipoServicios = async () => {
  const res = await axios.get(PATH);
  return res.data.data;
};

export const getOneTipoServicio = async (id) => {
  const res = await axios.get(`${PATH}/${id}`);
  return res.data.data;
};

export const createTipoServicio = async (data) => {
  return await axios.post(PATH, data);
};

export const updateTipoServicio = async ({ id, ...data }) => {
  return await axios.put(`${PATH}/${id}`, data);
};

export const deleteTipoServicio = async (id) => {
  return await axios.delete(`${PATH}/${id}`);
};
