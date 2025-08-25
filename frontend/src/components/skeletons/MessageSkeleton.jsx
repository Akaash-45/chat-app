const MessageSkeleton = () => {
  return (
    <>
      {/* Incoming message skeleton */}
      <div className="flex gap-3 items-start mb-6 animate-pulse2D">
        <div className="w-8 h-8 border border-white/20 bg-white/5"></div>
        <div className="flex flex-col gap-2">
          <div className="h-3 w-32 bg-white/10 border border-white/10"></div>
          <div className="h-3 w-40 bg-white/10 border border-white/10"></div>
          <div className="h-3 w-24 bg-white/10 border border-white/10"></div>
        </div>
      </div>

      {/* Outgoing message skeleton */}
      <div className="flex gap-3 items-start justify-end mb-6 animate-pulse2D delay-200">
        <div className="flex flex-col gap-2 items-end">
          <div className="h-3 w-36 bg-white/20 border border-white/20"></div>
          <div className="h-3 w-28 bg-white/20 border border-white/20"></div>
        </div>
        <div className="w-8 h-8 border border-white/30 bg-white/10"></div>
      </div>

      {/* Loading indicator */}
      <div className="flex justify-center mb-6 animate-pulse2D delay-400">
        <div className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/40">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span className="text-xs text-white/40 text-mono">
            LOADING_MESSAGES
          </span>
        </div>
      </div>
    </>
  );
};

export default MessageSkeleton;
