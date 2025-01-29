// src/routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import DashboardSection from '../components/DashboardSection';
import PlaylistPage from '../pages/PlaylistPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardSection />
  },
  {
    path: '/playlist/:playlistId',
    element: <PlaylistPage />
  }
]);