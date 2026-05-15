interface VideoPlayerProps {
  src?: string;
  title?: string;
  poster?: string;
}

export function VideoPlayer({ src, title, poster }: VideoPlayerProps) {
  if (!src) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-[16px] bg-[#17181B]">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#F26A2E]/10">
            <svg className="h-8 w-8 text-[#F26A2E]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="text-sm text-[#A8AAAE]">Video no disponible</p>
          <p className="mt-1 text-xs text-[#A8AAAE]/60">El contenido se publicará próximamente</p>
        </div>
      </div>
    );
  }

  const isGoogleDrive = src.includes("drive.google.com");
  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");

  if (isGoogleDrive) {
    let fileId = "";
    const match = src.match(/\/d\/([^/]+)/);
    if (match) fileId = match[1];
    const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-[16px] bg-black">
        <iframe
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title ?? "Video"}
        />
      </div>
    );
  }

  if (isYouTube) {
    let videoId = "";
    const match = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^?&/]+)/);
    if (match) videoId = match[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-[16px] bg-black">
        <iframe
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title ?? "Video"}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[16px] bg-black">
      <video
        className="h-full w-full"
        src={src}
        controls
        poster={poster}
        title={title}
      >
        Tu navegador no soporta el elemento de video.
      </video>
    </div>
  );
}
