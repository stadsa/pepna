import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import {
  AlertCircle,
  Play,
  RefreshCw,
} from "lucide-react";

import "./ProductVideo.css";

function formatTime(seconds) {
  if (
    typeof seconds !== "number" ||
    !Number.isFinite(seconds) ||
    seconds < 0
  ) {
    return "—";
  }

  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainingSeconds = total % 60;

  const paddedMinutes = String(minutes).padStart(
    2,
    "0"
  );

  const paddedSeconds = String(
    remainingSeconds
  ).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }

  return `${paddedMinutes}:${paddedSeconds}`;
}

function validStart(value) {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0
  );
}

export default function ProductVideo({
  title,
  video,
  fallbackPoster = "",
  showSteps = false,
}) {
  const videoRef = useRef(null);
  const playerId = useId();

  const [ready, setReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const src =
    typeof video?.src === "string"
      ? video.src.trim()
      : "";

  const poster =
    video?.poster || fallbackPoster;

  const steps = Array.isArray(video?.steps)
    ? video.steps
    : [];

  useEffect(() => {
    setReady(false);
    setDuration(0);
    setCurrentTime(0);
    setError("");
    setNotice("");
  }, [src]);

  const timedSteps = steps
    .filter(
      (step) =>
        validStart(step.start) &&
        step.start < duration
    )
    .slice()
    .sort((a, b) => a.start - b.start);

  let activeStepId = null;

  if (ready && !error) {
    for (const step of timedSteps) {
      if (currentTime >= step.start) {
        activeStepId = step.id;
      } else {
        break;
      }
    }
  }

  const handleLoadedMetadata = () => {
    const element = videoRef.current;

    if (!element) return;

    const videoDuration = element.duration;

    if (
      !Number.isFinite(videoDuration) ||
      videoDuration <= 0
    ) {
      setReady(false);
      setError(
        "Durasi video belum dapat dibaca. Gunakan file video yang dapat diputar."
      );
      return;
    }

    setDuration(videoDuration);
    setCurrentTime(element.currentTime);
    setReady(true);
    setError("");
  };

  const handleTimeUpdate = () => {
    const element = videoRef.current;

    if (element) {
      setCurrentTime(element.currentTime);
    }
  };

  const handleVideoError = () => {
    setReady(false);
    setNotice("");

    setError(
      "Video belum dapat dimuat. Periksa lokasi file atau koneksi internet."
    );
  };

  const jumpToStep = async (step) => {
    const element = videoRef.current;

    if (
      !element ||
      !ready ||
      error ||
      !validStart(step.start) ||
      step.start >= duration
    ) {
      return;
    }

    setNotice("");

    try {
      element.currentTime = step.start;
      setCurrentTime(step.start);
    } catch {
      setNotice(
        "Bagian video belum dapat dibuka. Coba kembali setelah video dimuat."
      );
      return;
    }

    try {
      await element.play();
    } catch {
      setNotice(
        "Waktu video sudah dipindahkan. Tekan tombol putar pada video untuk melanjutkan."
      );
    }
  };

  const retryVideo = () => {
    const element = videoRef.current;

    if (!element) return;

    setError("");
    setNotice("");
    setReady(false);
    setDuration(0);
    setCurrentTime(0);

    element.load();
  };

  return (
    <div className="product-video">
      {src ? (
        <div className="product-video-screen">
          <video
            key={src}
            id={playerId}
            ref={videoRef}
            className="product-video-element"
            src={src}
            poster={poster || undefined}
            controls
            playsInline
            preload="metadata"
            aria-label={title}
            onLoadedMetadata={handleLoadedMetadata}
            onDurationChange={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onSeeked={handleTimeUpdate}
            onEnded={handleTimeUpdate}
            onError={handleVideoError}
          >
            Browser Anda tidak mendukung pemutar video.
          </video>
        </div>
      ) : (
        <div
          className="product-video-placeholder"
          style={
            poster
              ? {
                  backgroundImage: `
                    linear-gradient(
                      rgba(18, 60, 67, 0.65),
                      rgba(18, 60, 67, 0.9)
                    ),
                    url("${poster}")
                  `,
                }
              : undefined
          }
        >
          <span
            className="product-video-placeholder-icon"
            aria-hidden="true"
          >
            <Play size={28} />
          </span>

          <h3>{title}</h3>

          <p>Video belum tersedia</p>
        </div>
      )}

      {error && (
        <div
          className="product-video-error"
          role="alert"
        >
          <AlertCircle
            size={20}
            aria-hidden="true"
          />

          <p>{error}</p>

          <button
            type="button"
            onClick={retryVideo}
          >
            <RefreshCw
              size={16}
              aria-hidden="true"
            />

            Coba lagi
          </button>
        </div>
      )}

      {notice && (
        <p
          className="product-video-notice"
          role="status"
        >
          {notice}
        </p>
      )}

      {showSteps && steps.length > 0 && (
        <div className="product-video-navigation">
          <div className="product-video-navigation-heading">
            <h3>Tahapan proses</h3>

            <p>
              Pilih tahap untuk menuju bagian
              terkait dalam video.
            </p>
          </div>

          <div
            className="product-video-steps"
            role="group"
            aria-label="Pilih tahapan proses"
          >
            {steps.map((step, index) => {
              const hasTime = validStart(
                step.start
              );

              const outsideDuration =
                ready &&
                hasTime &&
                step.start >= duration;

              const disabled =
                !src ||
                !ready ||
                Boolean(error) ||
                !hasTime ||
                outsideDuration;

              const active =
                activeStepId === step.id;

              let timeLabel =
                "Waktu belum ditentukan";

              if (hasTime) {
                timeLabel = outsideDuration
                  ? "Waktu di luar durasi video"
                  : formatTime(step.start);
              }

              return (
                <button
                  key={step.id}
                  type="button"
                  className={`product-video-step ${
                    active ? "is-active" : ""
                  }`}
                  disabled={disabled}
                  aria-current={
                    active ? "step" : undefined
                  }
                  aria-controls={
                    src ? playerId : undefined
                  }
                  onClick={() =>
                    jumpToStep(step)
                  }
                >
                  <span className="product-video-step-number">
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </span>

                  <span className="product-video-step-title">
                    {step.title}
                  </span>

                  <span className="product-video-step-time">
                    {timeLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

