import api from "../api/api";

export const getReview = async (attemptId) => {
  const response = await api.get(
    `tests/results/${attemptId}/review/`
  );

  return response.data;
};