import { useState } from "react";
import { createVideo } from "../../services/motivationService";

function CreateMotivationModal({
  onClose,
  onSuccess,
}) {
  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [publishDate, setPublishDate] =
    useState("");

  const [video, setVideo] =
    useState(null);

  const [youtubeLink, setYoutubeLink] =
    useState("");

  const [targetClass, setTargetClass] =
    useState("ALL");

  const [isActive, setIsActive] =
    useState(true);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append(
        "description",
        description
      );
      formData.append(
        "publish_date",
        publishDate
      );
      formData.append(
        "target_class",
        targetClass
      );
      formData.append(
        "is_active",
        isActive
      );

      if (video)
        formData.append("video", video);

      if (youtubeLink)
        formData.append(
          "youtube_link",
          youtubeLink
        );

console.log("Video State:", video);

for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
}

      await createVideo(formData);

      onSuccess();

      onClose();
    } catch (err) {
  console.log("ERROR:", err.response?.data);
  alert(JSON.stringify(err.response?.data, null, 2));
}
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white rounded-2xl p-8 w-[650px]">

        <h2 className="text-3xl font-bold mb-6">
          🌙 Add Evening Motivation
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="date"
            value={publishDate}
            onChange={(e) =>
              setPublishDate(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <select
            value={targetClass}
            onChange={(e) =>
              setTargetClass(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="ALL">
              All Students
            </option>

            <option value="1-5">
              Class 1-5
            </option>

            <option value="6-8">
              Class 6-8
            </option>

            <option value="9-10">
              Class 9-10
            </option>

            <option value="11-12">
              Class 11-12
            </option>

          </select>

          <input
  type="file"
  accept="video/*"
  onChange={(e) => {
    const file = e.target.files[0];

    console.log("Selected File:", file);

    setVideo(file);
  }}
/>

          <p className="text-center text-gray-500">
            OR
          </p>

          <input
            type="text"
            placeholder="YouTube Link"
            value={youtubeLink}
            onChange={(e) =>
              setYoutubeLink(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />

          <label className="flex gap-3">

            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) =>
                setIsActive(
                  e.target.checked
                )
              }
            />

            Publish

          </label>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-3 rounded-xl bg-blue-600 text-white"
          >
            Upload
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateMotivationModal;