import  { useState } from 'react';
import { Clock, CheckCircle, DollarSign, User, Star, BookOpen, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Link } from 'react-router-dom';

const DashboardSection = () => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);
  
  const statsCards = [
    { 
      title: "Learning Hours",
      value: "12.5",
      icon: Clock,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    },
    {
      title: "Quizzes Completed",
      value: "24",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Tokens Earned",
      value: "350",
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Rank",
      value: "#42",
      icon: User,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  const [courseProgress, setCourseProgress] = useState([
    { name: "Python Basics", progress: 75, isActive: true },
    { name: "Web Development", progress: 45, isActive: false },
    { name: "Data Science", progress: 30, isActive: false }
  ]);

  const recentActivities = [
    { id: 1, text: "Completed Python Functions Quiz", time: "2h ago", status: "green" },
    { id: 2, text: "Started Web Development Course", time: "5h ago", status: "blue" },
    { id: 3, text: "Earned 50 Tokens", time: "1d ago", status: "yellow" }
  ];

  const recommendedCourses = [
    {
      title: "Advanced Python Programming",
      description: "Master Python with advanced concepts and real-world applications",
      rating: 4.5,
      students: "2.5k",
      enrolled: false
    },
    {
      title: "React.js Fundamentals",
      description: "Build modern web applications with React.js",
      rating: 4.8,
      students: "3.2k",
      enrolled: false
    },
    {
      title: "Machine Learning Basics",
      description: "Introduction to machine learning algorithms and concepts",
      rating: 4.6,
      students: "1.8k",
      enrolled: false
    }
  ];

  const handleCourseClick = (index: number) => {
    setSelectedCourse(index);
  };

  const handleEnrollCourse = () => {
    if (selectedCourse !== null) {
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 3000);
    }
  };

  const handleContinueCourse = (index: number) => {
    const updatedProgress = [...courseProgress];
    if (updatedProgress[index].progress < 100) {
      updatedProgress[index].progress += 5;
      setCourseProgress(updatedProgress);
      
      if (updatedProgress[index].progress === 100) {
        setShowCongrats(true);
        setTimeout(() => setShowCongrats(false), 3000);
      }
    }
  };

  return (
    <section className="p-6 space-y-6">
      {showCongrats && (
        <Alert className="bg-green-100 border-green-200">
          <AlertDescription className="text-green-800">
            Congratulations on your progress! Keep up the great work! 🎉
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${card.bgColor}`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <p className="text-xl font-semibold">{card.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Progress */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Current Progress</h3>
            <div className="space-y-4">
              {courseProgress.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{course.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{course.progress}%</span>
                      <Button 
                        size="sm" 
                        onClick={() => handleContinueCourse(index)}
                        className="h-8"
                      >
                        Continue <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`w-2 h-2 bg-${activity.status}-500 rounded-full`} />
                  <p className="ml-3 text-sm text-gray-600">{activity.text}</p>
                  <span className="ml-auto text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Courses */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recommended Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedCourses.map((course, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 transition-all cursor-pointer ${
                  selectedCourse === index ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'
                }`}
                onClick={() => handleCourseClick(index)}
              >
                <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-semibold">{course.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                <div className="flex items-center mt-3">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="w-3 h-3" /> {course.rating}
                  </Badge>
                  <span className="text-xs text-gray-500 ml-2">
                    {course.students} students
                  </span>
                </div>
                {selectedCourse === index && (
                  <Button 
                    className="w-full mt-3"
                    onClick={handleEnrollCourse}
                  >
                    Enroll Now
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DashboardSection;