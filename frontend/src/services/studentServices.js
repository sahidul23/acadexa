import api from "../api/api";

export const getStudents = async () => {
  const response = await api.get("students/");
  return response.data;
};

export const createStudent = async (data) => {
  const response = await api.post("students/register/", data);
  return response.data;
};

// Get single assignment with questions
export const getAssignmentDetails = async (id) => {
  const response = await api.get(
    `daily-practice/assignments/${id}/`
  );

  return response.data;
};