/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { HiArrowLeft } from 'react-icons/hi';
import { Loader2 } from 'lucide-react';
import Quiz from '@/components/Quiz';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
}

const PlaylistPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
        );
        const fetchedVideos = response.data.items.map((item: any) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          description: item.snippet.description,
        }));
        setVideos(fetchedVideos);
        setSelectedVideo(fetchedVideos[0]);
      } catch (error) {
        setError('Failed to load playlist videos. Please try again later.');
        console.error('Error fetching playlist videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistVideos();
  }, [playlistId, apiKey]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading playlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Error Loading Playlist</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors group"
        >
          <HiArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          <span className="text-lg font-semibold">Back to Dashboard</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            {selectedVideo && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative pb-[56.25%]">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3">{selectedVideo.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-3">{selectedVideo.description}</p>
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <h2 className="text-xl font-bold p-6 border-b border-gray-100">
                Playlist Videos ({videos.length})
              </h2>
              <div className="overflow-y-auto max-h-[600px]">
                <ul className="divide-y divide-gray-100">
                  {videos.map((video) => (
                    <li
                      key={video.id}
                      onClick={() => setSelectedVideo(video)}
                      className={`flex items-start p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedVideo?.id === video.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="relative w-32 h-20 flex-shrink-0 rounded-md overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">
                          {video.title}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Quiz questions={[]} />
    </div>
  );
};

export default PlaylistPage;