import React, { useRef, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  onProgress: (progress: number) => void;
}

export const VideoPlayer = ({ videoId, title, onProgress }: VideoPlayerProps) => {
  const playerRef = useRef(null);
  const { bookmarks, toggleBookmark, userProgress } = useLearning();
  const isBookmarked = bookmarks.includes(videoId);
  const currentProgress = userProgress[videoId]?.progress || 0;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (playerRef.current) {
      interval = setInterval(() => {
        const player = playerRef.current;
        if (player && player.getCurrentTime && player.getDuration) {
          const progress = (player.getCurrentTime() / player.getDuration()) * 100;
          onProgress(progress);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [videoId, onProgress]);

  return (
    <div className="relative">
      <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
        <iframe
          ref={playerRef}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?start=${Math.floor((currentProgress / 100) * 60)}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 bg-white/80 hover:bg-white"
        onClick={() => toggleBookmark(videoId)}
      >
        {isBookmarked ? (
          <BookmarkCheck className="h-5 w-5 text-primary" />
        ) : (
          <Bookmark className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default VideoPlayer;