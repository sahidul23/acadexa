import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getVideos,
} from "../services/motivationService";
import CreateMotivationModal from "../components/motivation/CreateMotivationModal";

function MotivationVideos() {

  const [videos, setVideos] =
    useState([]);

  const [showModal, setShowModal] =
  useState(false);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {

      const data = await getVideos();

      setVideos(data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>

      <div className="flex justify-between">

        <h1 className="text-3xl font-bold">

          🌙 Evening Study

        </h1>

        <button
  onClick={() =>
    setShowModal(true)
  }
  className="bg-blue-600 text-white px-5 py-3 rounded-xl"
>
  + Upload Video
</button>

      </div>

      <div className="bg-white rounded-2xl shadow mt-8">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-4">

                Title

              </th>

              <th>

                Publish Date

              </th>

              <th>

                Active

              </th>

            </tr>

          </thead>

          <tbody>

            {videos.map((video)=>(

              <tr
                key={video.id}
                className="border-b"
              >

                <td className="p-4">

                  {video.title}

                </td>

                <td>

                  {video.publish_date}

                </td>

                <td>

                  {video.is_active
                    ? "✅"
                    : "❌"}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

{
  showModal && (

    <CreateMotivationModal

      onClose={() =>
        setShowModal(false)
      }

      onSuccess={loadVideos}

    />

  )
}

    </DashboardLayout>
  );
}

export default MotivationVideos;