import CoursesSection from "./pages/CourseSection";
import QuizDashboard from "./pages/QuizDashboard";
import TokenShop from "./pages/TokenShop";
import UserProfile from "./pages/UserProfile";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";

import DashboardSection from "./pages/DashboardSection";
import { Routes, Route } from "react-router-dom";
import PlaylistPage from "./pages/PlaylistPage";

// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
// import SignInPage from "./pages/auth/SignInPage";

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardSection />} />
        <Route path="/courses" element={<CoursesSection />} />
        <Route path="/quizzes" element={<QuizDashboard />} />
        <Route path="/tokenshop" element={<TokenShop />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/playlist/:playlistId" element={<PlaylistPage />} />

        </Routes>
    
     
    </div>
  );
};
export default App;
