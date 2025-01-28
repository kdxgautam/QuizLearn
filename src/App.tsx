import CoursesSection from "./pages/CourseSection";
import QuizDashboard from "./pages/QuizDashboard";
import TokenShop from "./pages/TokenShop";
import UserProfile from "./pages/UserProfile";
import DashboardSection from "./sections/DashboardSection"
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardSection />} />
        <Route path="/courses" element={<CoursesSection />} />
        <Route path="/quizzes" element={<QuizDashboard />} />
        <Route path="/tokenshop" element={<TokenShop />} />
        <Route path="/profile" element={<UserProfile />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
     
    </div>
  )
}
export default App