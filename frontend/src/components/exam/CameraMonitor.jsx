import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

const CameraMonitor = forwardRef((props, ref) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [error, setError] = useState("");

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Camera permission denied");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useImperativeHandle(ref, () => ({
    stopCamera,
  }));

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-bold mb-3">
        🔴 Live Monitoring
      </h2>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <video
  ref={videoRef}
  autoPlay
  playsInline
  muted
  className="w-48 h-36 object-cover rounded-lg border mx-auto"
/>
      )}
    </div>
  );
});

export default CameraMonitor;