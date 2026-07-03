import api from "../api/api";

// Get all assignments
export const getAssignments = async () => {
  const response = await api.get(
    "daily-practice/assignments/"
  );

  return response.data;
};

// Create assignment
export const createAssignment = async (data) => {
  const response = await api.post(
    "daily-practice/assignments/",
    data
  );

  return response.data;
};

// Update assignment
export const updateAssignment = async (
  id,
  data
) => {
  const response = await api.put(
    `daily-practice/assignments/${id}/`,
    data
  );

  return response.data;
};

// Delete assignment
export const deleteAssignment = async (
  id
) => {
  await api.delete(
    `daily-practice/assignments/${id}/`
  );
};


// Get questions of one assignment
export const getAssignmentQuestions = async (assignmentId) => {
  const response = await api.get(
    `daily-practice/questions/?practice=${assignmentId}`
  );

  return response.data;
};

// Create question
export const createAssignmentQuestion = async (data) => {
  const response = await api.post(
    "daily-practice/questions/",
    data
  );

  return response.data;
};

// Update question
export const updateAssignmentQuestion = async (
  id,
  data
) => {
  const response = await api.put(
    `daily-practice/questions/${id}/`,
    data
  );

  return response.data;
};

// Delete question
export const deleteAssignmentQuestion = async (
  id
) => {
  await api.delete(
    `daily-practice/questions/${id}/`
  );
};


// Student Assignments
export const getStudentAssignments = async () => {
  const response = await api.get(
    "daily-practice/assignments/"
  );

  return response.data;
};


// Get single assignment with questions
export const getAssignmentDetails = async (id) => {
  const response = await api.get(
    `daily-practice/assignments/${id}/`
  );

  return response.data;
};


// Upload assignment notebook
export const uploadAssignment = async (
  practiceId,
  images
) => {
  const formData = new FormData();

  formData.append("practice", practiceId);

  images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await api.post(
    "daily-practice/submissions/upload/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


// ================================
// Assignment Submissions (Admin)
// ================================

// Get all submissions
export const getSubmissions = async () => {
  const response = await api.get(
    "daily-practice/submissions/"
  );

  return response.data;
};

// Get one submission with images
export const getSubmissionReview = async (id) => {
  const response = await api.get(
    `daily-practice/submissions/${id}/review/`
  );

  return response.data;
};

// Save marks & feedback
export const evaluateSubmission = async (
  id,
  data
) => {
  const response = await api.post(
    `daily-practice/submissions/${id}/evaluate/`,
    data
  );

  return response.data;
};