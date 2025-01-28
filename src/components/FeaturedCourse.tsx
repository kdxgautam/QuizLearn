
import { Star, Clock } from 'lucide-react';

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


const FeaturedCourse: React.FC<CourseCardProps> = ({ course }) => (
  <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-2/3 aspect-video bg-gray-100 rounded-lg"></div>
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-full">
            Featured
          </span>
          <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
            {course.level}
          </span>
        </div>
        <h2 className="text-2xl font-bold">{course.title}</h2>
        <p className="text-gray-600">{course.description}</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-gray-600">
              {course.rating} ({course.reviews}k reviews)
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="ml-1 text-gray-600">{course.duration}</span>
          </div>
        </div>
        <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Start Learning
        </button>
      </div>
    </div>
  </div>
);

export default FeaturedCourse;