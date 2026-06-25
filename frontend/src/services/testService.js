import api from "../api/api";

export const getTests = async () => {
  const response = await api.get("tests/");
  return response.data;
};

export const createTest = async (data) => {
  const response = await api.post("tests/", data);
  return response.data;
};

export const updateTest = async (id, data) => {
  const response = await api.put(`tests/${id}/`, data);
  return response.data;
};

export const deleteTest = async (id) => {
  await api.delete(`tests/${id}/`);
};