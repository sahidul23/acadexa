import { useState } from "react";
import { createNote } from "../../services/noteService";

function UploadNoteModal({ open, onClose, refreshNotes }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Physics");
  const [chapter, setChapter] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [published, setPublished] = useState(true);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("chapter", chapter);
      formData.append("description", description);
      formData.append("youtube_link", youtubeLink);
      formData.append("is_published", published);

      if (pdfFile) {
        formData.append("pdf_file", pdfFile);
      }

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      await createNote(formData);

      alert("Note uploaded successfully!");

      refreshNotes();
      onClose();

    } catch (error) {
  console.log(error);
  console.log(error.response);
  console.log(error.response?.data);

  alert(JSON.stringify(error.response?.data));
}
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-2xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          📚 Upload Notes
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Title"
            className="w-full border rounded-lg p-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <select
            className="w-full border rounded-lg p-3"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Biology</option>
            <option>Mathematics</option>
          </select>

          <input
            type="text"
            placeholder="Chapter"
            className="w-full border rounded-lg p-3"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            rows="4"
            className="w-full border rounded-lg p-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="url"
            placeholder="YouTube Link"
            className="w-full border rounded-lg p-3"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />

          <div>
            <label className="font-semibold">
              Upload PDF
            </label>

            <input
              type="file"
              accept=".pdf"
              className="mt-2"
              onChange={(e) =>
                setPdfFile(e.target.files[0])
              }
            />
          </div>

          <div>
            <label className="font-semibold">
              Upload Thumbnail
            </label>

            <input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={(e) =>
                setThumbnail(e.target.files[0])
              }
            />
          </div>

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={published}
              onChange={(e) =>
                setPublished(e.target.checked)
              }
            />

            <span>Publish immediately</span>

          </div>

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Upload
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default UploadNoteModal;