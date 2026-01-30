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
  return await axios.put(`${PATH}/${id}`, data, {withCredentials: true});
};

export const deleteUsuario = async (id) => {
  return await axios.delete(`${PATH}/${id}`, {withCredentials: true});
};

export const loginUsuario = async (data) => {
  const res = await axios.post(`${PATH}/login`, data, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' } });
  return res.data.data;
};

export const getAuthUsuario = async () => {
  const res = await axios.get(`${PATH}/me`, { withCredentials: true });
  return res.data.user;
}

export const logoutUsuario = async () => {
  const res = await axios.post(`${PATH}/logout`,{}, { withCredentials: true });
  return res.data.message;
};