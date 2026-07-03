import api from "../api/api";

export const getExamQuestions = async (testId) => {
  const response = await api.get(`tests/questions/?test=${testId}`);
  return response.data;
};

export const submitExam = async (testId, answers) => {
  const response = await api.post(
    `tests/${testId}/submit/`,
    {
      answers,
    }
  );

  return response.data;
};