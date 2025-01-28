import React from 'react';
import { Pencil, Check, TrendingUp, Clock, Star, Zap } from 'lucide-react';

interface Achievement {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

interface ActivityItem {
  type: 'completion' | 'started' | 'achievement';
  description: string;
  timeAgo: string;
  tokens?: number;
  dotColor: string;
}

interface ProgressItem {
  subject: string;
  progress: number;
}



const UserProfile: React.FC = () => {
  const achievements: Achievement[] = [
    {
      title: 'Quiz Master',
      description: 'Complete 100 quizzes',
      icon: <Star className="w-6 h-6" />,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      title: 'Fast Learner',
      description: 'Complete 5 courses',
      icon: <Zap className="w-6 h-6" />,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const recentActivity: ActivityItem[] = [
    {
      type: 'completion',
      description: 'Completed "Advanced Python Quiz"',
      timeAgo: '2 hours ago',
      tokens: 50,
      dotColor: 'bg-green-500'
    },
    {
      type: 'started',
      description: 'Started "Web Development Course"',
      timeAgo: '1 day ago',
      dotColor: 'bg-blue-500'
    },
    {
      type: 'achievement',
      description: 'Earned "Python Master" badge',
      timeAgo: '2 days ago',
      dotColor: 'bg-purple-500'
    }
  ];

  const learningProgress: ProgressItem[] = [
    { subject: 'Python Programming', progress: 85 },
    { subject: 'Web Development', progress: 60 },
    { subject: 'Data Science', progress: 40 }
  ];

  return (
    <section className="p-4 md:p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img
              src="/api/placeholder/96/96"
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-neutral-200/30 hover:bg-gray-50">
              <Pencil className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">John Smith</h2>
            <p className="text-gray-600">john.smith@example.com</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-full">
                Level 24
              </span>
              <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
                750 Tokens
              </span>
              <span className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-full">
                Python Expert
              </span>
            </div>
          </div>
          
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-neutral-200/30">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Check className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Completed Quizzes</p>
              <p className="text-xl font-semibold">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200/30">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-xl font-semibold">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200/30">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Learning Hours</p>
              <p className="text-xl font-semibold">48.5</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200/30">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Achievements</p>
              <p className="text-xl font-semibold">24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${activity.dotColor}`} />
                <div className="flex-1">
                  <p className="text-sm">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.timeAgo}</p>
                </div>
                {activity.tokens && (
                  <span className="text-sm text-green-600">+{activity.tokens} tokens</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="border border-neutral-200/30 rounded-lg p-4 text-center">
                <div className={`w-12 h-12 ${achievement.bgColor} rounded-full flex items-center justify-center mx-auto`}>
                  <div className={achievement.iconColor}>{achievement.icon}</div>
                </div>
                <h4 className="mt-2 font-medium">{achievement.title}</h4>
                <p className="text-sm text-gray-500">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
        <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
        <div className="space-y-4">
          {learningProgress.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">{item.subject}</span>
                <span className="text-sm text-gray-600">{item.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;