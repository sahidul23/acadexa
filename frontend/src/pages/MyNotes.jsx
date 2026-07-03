import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getPublishedNotes } from "../services/noteService";

function MyNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await getPublishedNotes();
      setNotes(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load notes");
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        📚 My Notes
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {notes.map((note) => (

          <div
            key={note.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >

            {note.thumbnail ? (
              <img
                src={note.thumbnail}
                alt={note.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="h-48 bg-blue-100 flex items-center justify-center text-6xl">
                📘
              </div>
            )}

            <div className="p-5">

              <span className="text-sm text-blue-600 font-semibold">
                {note.subject}
              </span>

              <h2 className="text-xl font-bold mt-2">
                {note.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {note.chapter}
              </p>

              <p className="text-gray-600 mt-4 line-clamp-3">
                {note.description}
              </p>

              <div className="flex gap-3 mt-6">

                {note.pdf_file && (
                  <a
                    href={note.pdf_file}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center"
                  >
                    📄 PDF
                  </a>
                )}

                {note.youtube_link && (
                  <a
                    href={note.youtube_link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-center"
                  >
                    ▶ Video
                  </a>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}

export default MyNotes;