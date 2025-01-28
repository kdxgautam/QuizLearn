import { Star} from 'lucide-react';

interface Course {
    id: string;
    title: string;
    description: string;
    category: string;
    categoryColor: string;
    level: string;
    duration: string;
    rating: number;
    reviews?: number;
    isFeatured?: boolean;
  }

interface CourseCardProps {
    course: Course;
  }
  
  const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
    <div className="bg-white rounded-lg border border-neutral-200/30 overflow-hidden">
      <div className="aspect-video bg-gray-100"></div>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs ${course.categoryColor} rounded-full`}>
            {course.category}
          </span>
          <span className={`px-2 py-1 text-xs ${
            course.level === 'Beginner' ? 'bg-green-100 text-green-600' :
            course.level === 'Intermediate' ? 'bg-blue-100 text-blue-600' :
            'bg-yellow-100 text-yellow-600'
          } rounded-full`}>
            {course.level}
          </span>
        </div>
        <h3 className="font-semibold">{course.title}</h3>
        <p className="text-sm text-gray-600">{course.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
          </div>
          <span className="text-sm text-gray-600">{course.duration}</span>
        </div>
        <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Enroll Now
        </button>
      </div>
    </div>
  );
  export default CourseCard;