import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, DollarSign, User, ArrowRight, PlayCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface StatsCard {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

interface CourseProgress {
  name: string;
  progress: number;
  isActive: boolean;
}

interface RecentActivity {
  id: number;
  text: string;
  time: string;
  status: string;
}

interface RecommendedPlaylist {
  title: string;
  creator: string;
  playlistId: string;
  views: string;
  duration: string;
}

const DashboardSection = () => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);

  const statsCards: StatsCard[] = [
    { title: "Learning Hours", value: "12.5", icon: Clock, color: "text-indigo-600", bgColor: "bg-indigo-100" },
    { title: "Quizzes Completed", value: "24", icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-100" },
    { title: "Tokens Earned", value: "350", icon: DollarSign, color: "text-yellow-600", bgColor: "bg-yellow-100" },
    { title: "Rank", value: "#42", icon: User, color: "text-purple-600", bgColor: "bg-purple-100" }
  ];

  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([
    { name: "Python Basics", progress: 75, isActive: true },
    { name: "Web Development", progress: 45, isActive: false },
    { name: "Data Science", progress: 30, isActive: false }
  ]);

  const recentActivities: RecentActivity[] = [
    { id: 1, text: "Completed Python Functions Quiz", time: "2h ago", status: "green" },
    { id: 2, text: "Started Web Development Course", time: "5h ago", status: "blue" },
    { id: 3, text: "Earned 50 Tokens", time: "1d ago", status: "yellow" }
  ];

  const recommendedPlaylists: RecommendedPlaylist[] = [
    {
      title: "Python for Beginners",
      creator: "Code Academy",
      playlistId: "PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU",
      views: "1.2M",
      duration: "4h 30min"
    },
    {
      title: "Web Development Crash Course",
      creator: "Dev Ed",
      playlistId: "PL7CBVLpg0zqdefaZ8SSZp-QgqsSimPQaA",
      views: "850K",
      duration: "3h 15min"
    },
    {
      title: "Data Science Essentials",
      creator: "Data School",
      playlistId: "PL2zq7klxX5ASFejJj80ob9ZAnBHdz5O1t",
      views: "500K",
      duration: "5h 45min"
    }
  ];

  const handleCourseClick = (index:number) => {
    setSelectedCourse(index);
  };

  const handleEnrollCourse = () => {
    if (selectedCourse !== null) {
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 3000);
    }
  };

  const handleContinueCourse = (index:number) => {
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
      {/* Alert for congratulatory message */}
      {showCongrats && (
        <Alert className="bg-green-100 border-green-200">
          <AlertDescription className="text-green-800">
            Congratulations on your progress! Keep up the great work! 🎉
          </AlertDescription>
        </Alert>
      )}

      {/* Statistics Cards */}
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

      {/* Current Progress and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

      {/* Recommended Playlists Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recommended Video Playlists</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedPlaylists.map((playlist, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                {/* Embed YouTube Playlist */}
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/videoseries?list=${playlist.playlistId}`}
                    title={playlist.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {/* Playlist Details */}
                <div className="p-4">
                  {/* Link to Playlist Page */}
                  <Link to={`/playlist/${playlist.playlistId}`}>
                    <h4 className="font-semibold cursor-pointer">{playlist.title}</h4>
                  </Link>
                  <p className="text-sm text-gray-500">{playlist.creator}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <PlayCircle className="w-4 h-4 mr-1" />
                    <span className="mr-3">{playlist.duration}</span>
                    <span>{playlist.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </section>
  );
};

export default DashboardSection;
