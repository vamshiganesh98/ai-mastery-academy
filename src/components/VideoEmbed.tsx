interface VideoEmbedProps {
  videoId: string
  title: string
}

export function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl shadow-indigo-500/10">
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <div className="px-4 py-2.5 bg-gray-900/80 border-t border-white/5">
        <p className="text-xs text-gray-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          {title}
        </p>
      </div>
    </div>
  )
}
