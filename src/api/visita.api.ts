import axios from 'axios';
const PATH = 'http://localhost:3000/api/visitas';
export const getVisitas = async () => {
  const userId = localStorage.getItem('userId');
  const userType = localStorage.getItem('userType');

  const res = await axios.get(PATH, { params: { userId, userType } });
  return res.data.data;
};

export const createVisita = async (data) => {
  return await axios.post(PATH, data);
};

export const updateVisita = async ({ id, ...data }) => {
  return await axios.put(`${PATH}/${id}`, data);
};

export const deleteVisita = async (id) => {
  return await axios.delete(`${PATH}/${id}`);
};
