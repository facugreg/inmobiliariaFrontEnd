import axios from 'axios';

const PATH = 'http://localhost:3000/api/usuarios';

export const getUsuarios = async () => {
  const res = await axios.get(PATH);
  return res.data.data;
};

export const getOneUsuario = async (id) => {
  const res = await axios.get(`${PATH}/${id}`);
  return res.data.data;
};

export const createUsuario = async (data) => {
  return await axios.post(PATH, data);
};

export const updateUsuario = async ({ id, ...data }) => {
  return await axios.put(`${PATH}/${id}`, data);
};

export const deleteUsuario = async (id) => {
  return await axios.delete(`${PATH}/${id}`);
};

export const loginUsuario = async (data) => {
  const res = await axios.post(`${PATH}/login`, data, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' } });
  return res.data.data;
};
