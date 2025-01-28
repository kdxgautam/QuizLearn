import React from 'react';
import { Check, Zap, DollarSign} from 'lucide-react';

interface QuizCardProps {
  title: string;
  description: string;
  questions: number;
  duration: number;
  reward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onStart: () => void;
}

interface ActivityProps {
  title: string;
  completedAt: string;
  score: number;
  tokensEarned: number;
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  description,
  questions,
  duration,
  reward,
  difficulty,
  onStart
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-green-100 text-green-600';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'Hard':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="border border-neutral-200/30 rounded-lg p-4 hover:border-indigo-500 transition-colors">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <span className="text-sm text-gray-500">{questions} questions</span>
            <span className="text-sm text-gray-500">{duration} minutes</span>
            <span className="text-sm text-gray-500">{reward} tokens reward</span>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className={`px-3 py-1 text-sm rounded-full ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
          <button 
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={onStart}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

const ActivityCard: React.FC<ActivityProps> = ({
  title,
  completedAt,
  score,
  tokensEarned
}) => (
  <div className="flex flex-col sm:flex-row items-center justify-between p-3 bg-gray-50 rounded-lg gap-4">
    <div className="flex items-center gap-4 w-full sm:w-auto">
      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="w-6 h-6 text-green-600" />
      </div>
      <div>
        <h4 className="font-medium text-center sm:text-left">{title}</h4>
        <p className="text-sm text-gray-500">{completedAt}</p>
      </div>
    </div>
    <div className="text-center sm:text-right">
      <p className="font-medium">{score}%</p>
      <p className="text-sm text-gray-500">{tokensEarned} tokens earned</p>
    </div>
  </div>
);

const QuizDashboard: React.FC = () => {
  return (
    <section className="p-4 md:p-6 space-y-6">
      {/* Quiz Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-neutral-200/30">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Completed Quizzes</p>
              <p className="text-xl font-semibold">32</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200/30">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Average Score</p>
              <p className="text-xl font-semibold">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200/30">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Tokens Earned</p>
              <p className="text-xl font-semibold">450</p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Quizzes */}
      <div className="bg-white rounded-lg border border-neutral-200/30 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold">Available Quizzes</h2>
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <select className="px-4 py-2 border border-neutral-200/30 rounded-lg w-full sm:w-auto">
              <option>All Categories</option>
              <option>Python</option>
              <option>JavaScript</option>
              <option>Data Science</option>
            </select>
            <select className="px-4 py-2 border border-neutral-200/30 rounded-lg w-full sm:w-auto">
              <option>Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <QuizCard
            title="Python Fundamentals Quiz"
            description="Test your knowledge of Python basics"
            questions={15}
            duration={30}
            reward={50}
            difficulty="Easy"
            onStart={() => console.log('Starting Python quiz')}
          />
          <QuizCard
            title="JavaScript Advanced Concepts"
            description="Challenge yourself with advanced JS topics"
            questions={20}
            duration={45}
            reward={100}
            difficulty="Medium"
            onStart={() => console.log('Starting JavaScript quiz')}
          />
          <QuizCard
            title="Machine Learning Concepts"
            description="Expert level ML algorithms and concepts"
            questions={25}
            duration={60}
            reward={150}
            difficulty="Hard"
            onStart={() => console.log('Starting ML quiz')}
          />
        </div>
      </div>

      {/* Recent Quiz Activity */}
      <div className="bg-white rounded-lg border border-neutral-200/30 p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Quiz Activity</h2>
        <div className="space-y-4">
          <ActivityCard
            title="Python Basics Quiz"
            completedAt="Completed yesterday"
            score={90}
            tokensEarned={45}
          />
          <ActivityCard
            title="JavaScript DOM Quiz"
            completedAt="Completed 2 days ago"
            score={75}
            tokensEarned={30}
          />
        </div>
      </div>
    </section>
  );
};

export default QuizDashboard;