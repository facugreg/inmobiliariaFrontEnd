import axios from 'axios';

const PATH = 'http://localhost:3000/api/localidades';

export const getLocalidades = async () => {
  const res = await axios.get(PATH);
  return res.data.data;
};

export const getOneLocalidad = async (id) => {
  const res = await axios.get(`${PATH}/${id}`);
  return res.data.data;
};

export const createLocalidad = async (data) => {
  return await axios.post(PATH, data);
};

export const updateLocalidad = async ({ id, ...data }) => {
  return await axios.put(`${PATH}/${id}`, data);
};

export const deleteLocalidad = async (id) => {
  return await axios.delete(`${PATH}/${id}`);
};
