import api from "../api/api";

export const getQuestions = async () => {
  const response = await api.get("tests/questions/");
  return response.data;
};

export const createQuestion = async (data) => {
  const response = await api.post("tests/questions/", data);
  return response.data;
};

export const updateQuestion = async (id, data) => {
  const response = await api.put(`tests/questions/${id}/`, data);
  return response.data;
};

export const deleteQuestion = async (id) => {
  await api.delete(`tests/questions/${id}/`);
};