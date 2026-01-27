import axios from 'axios';

const PATH = 'http://localhost:3000/api/propietarios';

export const getPropietarios = async () => {
  const res = await axios.get(PATH);
  return res.data.data;
};

export const getOnePropietario = async (id) => {
  const res = await axios.get(`${PATH}/${id}`);
  return res.data.data;
};

export const createPropietario = async (data) => {
  return await axios.post(PATH, data, {withCredentials: true});
};

export const updatePropietario = async ({ id, ...data }) => {
  return await axios.put(`${PATH}/${id}`, data, {withCredentials: true});
};

export const deletePropietario = async (id) => {
  return await axios.delete(`${PATH}/${id}`, {withCredentials: true});
};
