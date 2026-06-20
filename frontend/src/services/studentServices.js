import api from "../api/api";

export const getStudents = async () => {
  const response = await api.get("students/");
  return response.data;
};

export const createStudent = async (data) => {
  const response = await api.post("students/register/", data);
  return response.data;
};