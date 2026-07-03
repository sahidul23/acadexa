import api from "../api/api";

// Get all notes
export const getNotes = async () => {
  const response = await api.get("notes/");
  return response.data;
};

// Create note
export const createNote = async (formData) => {
  const response = await api.post("notes/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update note
export const updateNote = async (id, formData) => {
  const response = await api.put(`notes/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete note
export const deleteNote = async (id) => {
  await api.delete(`notes/${id}/`);
};


// Student & Admin
export const getPublishedNotes = async () => {
  const response = await api.get("notes/");
  return response.data;
};


// Get single note
export const getNote = async (id) => {
  const response = await api.get(`notes/${id}/`);
  return response.data;
};