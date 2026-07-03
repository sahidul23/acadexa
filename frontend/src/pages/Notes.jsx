import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  getNotes,
  deleteNote,
} from "../services/noteService";

import UploadNoteModal from "../components/notes/UploadNoteModal";
import EditNoteModal from "../components/notes/EditNoteModal";


function Notes() {

  const [notes, setNotes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
const [openEditModal, setOpenEditModal] = useState(false);
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load notes");
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmDelete) return;

  try {
    await deleteNote(id);

    alert("Note deleted successfully");

    loadNotes();

  } catch (error) {
    console.log(error);
    alert("Failed to delete note");
  }
};

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          📚 Notes Management
        </h1>

        <button
  onClick={() => setOpenModal(true)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
>
  + Upload Note
</button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Chapter</th>
              <th className="p-4">Published</th>
              <th className="p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {notes.map((note) => (

              <tr
                key={note.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {note.title}
                </td>

                <td className="p-4">
                  {note.subject}
                </td>

                <td className="p-4">
                  {note.chapter}
                </td>

                <td className="text-center">

                  {note.is_published ? (
                    <span className="text-green-600 font-bold">
                      Published
                    </span>
                  ) : (
                    <span className="text-red-600 font-bold">
                      Hidden
                    </span>
                  )}

                </td>

                <td className="text-center">

                  <button
  onClick={() => {
    setSelectedNote(note);
    setOpenEditModal(true);
  }}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2"
>
  Edit
</button>

                  <button
  onClick={() => handleDelete(note.id)}
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
>
  Delete
</button>


                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

<UploadNoteModal
  open={openModal}
  onClose={() => setOpenModal(false)}
  refreshNotes={loadNotes}
/>

<EditNoteModal
  open={openEditModal}
  note={selectedNote}
  onClose={() => setOpenEditModal(false)}
  refreshNotes={loadNotes}
/>

    </DashboardLayout>
  );
}

export default Notes;