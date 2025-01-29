// types.ts
import { LucideIcon } from 'lucide-react';
// export interface NavItem {
//     href: string;
//     icon: React.ComponentType<{ className?: string }>;
//     label: string;
//     isActive: boolean;
//   }
  
  export interface Notification {
    id: number;
    text: string;
    time: string;
    unread: boolean;
  }



export interface NavItem {
  path: string;
  icon: LucideIcon;
  label: string;
}

export type StatsCard = {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
};

export type Course = {
  name: string;
  progress: number;
  isActive: boolean;
};

export type Activity = {
  id: number;
  text: string;
  time: string;
  status: string;
};

export type RecommendedCourse = {
  title: string;
  description: string;
  rating: number;
  students: string;
  enrolled: boolean;
};




export type Video = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
  duration: string;
  watched: boolean;
  progress: number;
};

export type Playlist = {
  id: string;
  title: string;
  description: string;
  videos: Video[];
  totalDuration: string;
  progress: number;
};

export type UserProgress = {
  videoId: string;
  progress: number;
  completed: boolean;
  timestamp: number;
};
