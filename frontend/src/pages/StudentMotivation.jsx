import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getVideos,
  completeVideo,
} from "../services/motivationService";

function StudentMotivation() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [started, setStarted] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    loadVideo();
  }, []);

const loadVideo = async () => {
  try {
    const data = await getVideos();

    console.log("API DATA:", data);

    if (data.length > 0) {
      console.log("VIDEO FIELD:", data[0].video);

      setVideo(data[0]);
    }

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  const handleComplete = async () => {
    try {
      await completeVideo(video.id);
      setCompleted(true);
    } catch (err) {
      console.log(err);
      alert("Failed to complete session.");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center text-2xl font-bold mt-20">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  if (!video) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">

            <h1 className="text-6xl">🌙</h1>

            <h2 className="text-4xl font-bold mt-6">
              No Motivation Video Today
            </h2>

            <p className="mt-5 text-gray-600">
              Please come back tomorrow.
            </p>

          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (completed) {
    return (
      <DashboardLayout>

        <div className="max-w-5xl mx-auto">

          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">

            <div className="text-7xl">
              🎉
            </div>

            <h1 className="text-5xl font-bold mt-6">
              Great Job!
            </h1>

            <p className="mt-5 text-xl text-gray-600">
              You have completed today's motivation session.
            </p>

            <div className="bg-blue-50 rounded-2xl p-8 mt-10 text-left">

              <h2 className="text-3xl font-bold mb-5">
                📖 Now Start Your Study
              </h2>

              <ul className="space-y-4 text-lg">

                <li>✅ Keep your phone aside</li>

                <li>📚 Open your notebook</li>

                <li>✍ Complete today's homework</li>

                <li>⭐ Study with full concentration</li>

              </ul>

            </div>

            <p className="mt-10 text-gray-500 text-lg">
              Have a wonderful study session 🌙
            </p>

          </div>

        </div>

      </DashboardLayout>
    );
  }

  if (!started) {
    return (
      <DashboardLayout>

        <div className="max-w-5xl mx-auto">

          <div className="bg-gradient-to-r from-indigo-700 to-blue-600 rounded-3xl text-white shadow-xl p-12">

            <h1 className="text-5xl font-bold">
              🌙 Evening Study
            </h1>

            <p className="mt-5 text-xl text-blue-100">
              Welcome to today's Evening Study Session.
            </p>

            <div className="bg-white/10 rounded-2xl p-8 mt-10">

              <h2 className="text-3xl font-bold">
                Today's Motivation
              </h2>

              <h3 className="mt-5 text-2xl">
                {video.title}
              </h3>

              <p className="mt-4 text-blue-100">
                {video.description}
              </p>

            </div>

            <div className="mt-10">

              <button
                onClick={() => setStarted(true)}
                className="bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl hover:scale-105 transition"
              >
                ▶ Start Session
              </button>

            </div>

          </div>

        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h1 className="text-4xl font-bold">
            🎥 {video.title}
          </h1>

          <p className="mt-4 text-gray-600">
            {video.description}
          </p>

          {video.video && (

            <video
              controls
              controlsList="nodownload"
              className="w-full rounded-2xl mt-8"
              onEnded={() => setVideoFinished(true)}
            >
              <source
                src={video.video}
                type="video/mp4"
              />
            </video>

          )}

          <div className="bg-yellow-50 rounded-2xl p-8 mt-8">

            <h2 className="text-2xl font-bold">
              📖 Today's Study
            </h2>

            <p className="mt-4 text-lg">
              After watching the motivation video,
              keep your phone aside and continue your
              studies using your notebook.
            </p>

          </div>

          <button
            disabled={!videoFinished}
            onClick={handleComplete}
            className={`mt-8 px-8 py-4 rounded-2xl font-bold text-white transition ${
              videoFinished
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {videoFinished
              ? "✅ Finish Session"
              : "Watch Complete Video"}
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default StudentMotivation;