import api from "../api/api";

// Student
export const getMyResults = async () => {
  const response = await api.get("tests/results/");
  return response.data;
};

// Admin
export const getAllResults = async () => {
  const response = await api.get("tests/results/");
  return response.data;
};

// Result Details
export const getResultDetails = async (id) => {
  const response = await api.get(
    `tests/results/${id}/details/`
  );

  return response.data;
};