import { assetPath } from "@/lib/assetPath";
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <div className="project-video">
      <video
        controls
        playsInline
        preload="none"
        aria-label={title}
        style={{
          width: "100%",
          display: "block",
          borderRadius: "12px",
          background: "#000",
        }}
      >
        <source src={assetPath(src)} type="video/mp4" />
        Your browser does not support the video element.
      </video>
    </div>
  );
}
