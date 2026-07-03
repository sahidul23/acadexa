import api from "../api/api";

// Get all videos
export const getVideos = async () => {
  const response = await api.get(
    "motivation/videos/"
  );

  return response.data;
};

// Create video
export const createVideo = async (formData) => {
  const response = await api.post(
    "motivation/videos/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete video
export const deleteVideo = async (id) => {
  await api.delete(
    `motivation/videos/${id}/`
  );
};

// Student complete video
export const completeVideo = async (
  motivation,
  camera_enabled = false
) => {
  const response = await api.post(
    "motivation/watch/complete/",
    {
      motivation,
      camera_enabled,
    }
  );

  return response.data;
};