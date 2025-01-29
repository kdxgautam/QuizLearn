import React from 'react';
import { useLearning } from '../context/LearningContext';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PlayCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlaylistSidebarProps {
  playlist: Playlist;
  currentVideo: string;
  onVideoSelect: (videoId: string) => void;
}

export const PlaylistSidebar = ({
  playlist,
  currentVideo,
  onVideoSelect,
}: PlaylistSidebarProps) => {
  const { userProgress, bookmarks } = useLearning();

  return (
    <Card className="w-full h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold">{playlist.title}</h2>
        <p className="text-sm text-gray-500">{playlist.videos.length} videos</p>
        <Progress 
          value={playlist.progress} 
          className="mt-2"
          indicatorClassName="bg-primary"
        />
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {playlist.videos.map((video, index) => {
          const progress = userProgress[video.videoId]?.progress || 0;
          const isCompleted = progress === 100;
          const isBookmarked = bookmarks.includes(video.videoId);
          
          return (
            <div
              key={video.id}
              className={cn(
                "flex gap-3 p-4 border-b hover:bg-gray-50 cursor-pointer",
                currentVideo === video.videoId && "bg-gray-100",
                isCompleted && "bg-gray-50"
              )}
              onClick={() => onVideoSelect(video.videoId)}
            >
              <div className="relative w-40 h-24 flex-shrink-0">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover rounded"
                />
                {currentVideo === video.videoId ? (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <PlayCircle className="w-8 h-8 text-white" />
                  </div>
                ) : isCompleted && (
                  <div className="absolute bottom-2 right-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium line-clamp-2 text-sm">
                  {video.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-gray-500">
                    Video {index + 1} of {playlist.videos.length}
                  </p>
                  {progress > 0 && progress < 100 && (
                    <Progress 
                      value={progress} 
                      className="h-1 w-20"
                      indicatorClassName="bg-primary"
                    />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {video.duration}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
