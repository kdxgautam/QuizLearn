import React, { useState } from 'react';
import { Search } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import FeaturedCourse from '@/components/FeaturedCourse';



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

const CoursesSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Difficulty');
  const [sortBy, setSortBy] = useState('Sort By');

  const featuredCourse: Course = {
    id: 'featured-1',
    title: 'Complete Python Bootcamp',
    description: 'Master Python from basics to advanced concepts with hands-on projects and real-world applications.',
    category: 'Programming',
    categoryColor: 'bg-blue-100 text-blue-600',
    level: 'Beginner',
    duration: '20 hours',
    rating: 4.8,
    reviews: 2.3,
    isFeatured: true
  };

  const courses: Course[] = [
    {
      id: '1',
      title: 'Modern JavaScript Complete Guide',
      description: 'Learn modern JavaScript from the basics to advanced topics with practical examples.',
      category: 'Web Dev',
      categoryColor: 'bg-blue-100 text-blue-600',
      level: 'Intermediate',
      duration: '15 hours',
      rating: 4.7
    },
    {
      id: '2',
      title: 'Machine Learning Fundamentals',
      description: 'Master the core concepts of machine learning and data analysis.',
      category: 'Data Science',
      categoryColor: 'bg-purple-100 text-purple-600',
      level: 'Advanced',
      duration: '25 hours',
      rating: 4.9
    },
    {
      id: '3',
      title: 'React Native for Beginners',
      description: 'Build cross-platform mobile apps with React Native framework.',
      category: 'Mobile Dev',
      categoryColor: 'bg-red-100 text-red-600',
      level: 'Beginner',
      duration: '18 hours',
      rating: 4.6
    }
  ];

  return (
    <section className="p-6 space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg border border-neutral-200/30">
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <input
              type="search"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option>All Categories</option>
            <option>Programming</option>
            <option>Data Science</option>
            <option>Web Development</option>
            <option>Mobile Development</option>
          </select>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option>Difficulty</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option>Sort By</option>
            <option>Most Popular</option>
            <option>Newest</option>
            <option>Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Featured Course */}
      <FeaturedCourse course={featuredCourse} />

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="px-4 py-2 border border-neutral-200/30 rounded-lg hover:bg-gray-50"
        >
          Previous
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === page
                ? 'bg-indigo-600 text-white'
                : 'border border-neutral-200/30 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
          className="px-4 py-2 border border-neutral-200/30 rounded-lg hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default CoursesSection;