import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  questions: QuizQuestion[];
}

// Sample quiz data
const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which programming language is known for building user interfaces?",
    options: ["Python", "React", "SQL", "PHP"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What does CSS stand for?",
    options: [
      "Counter Strike Source",
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Which of these is a JavaScript framework?",
    options: ["Django", "Flask", "Ruby on Rails", "Vue.js"],
    correctAnswer: 3
  },
  {
    id: 4,
    question: "What is the primary function of a database?",
    options: [
      "Store and manage data",
      "Display user interfaces",
      "Process images",
      "Send emails"
    ],
    correctAnswer: 0
  }
];

const Quiz: React.FC<QuizProps> = ({ questions = sampleQuestions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(optionIndex);
    setAnswered(true);
    
    // Store user's answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = optionIndex;
    setUserAnswers(newUserAnswers);

    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 2);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  if (showResult) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
          <div className="text-5xl font-bold text-blue-600 mb-4">
            Score: {score}/{questions.length * 2}
          </div>
          <p className="text-lg text-gray-600">
            You got {score / 2} out of {questions.length} questions correct
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <div 
              key={question.id}
              className={`p-6 rounded-lg border-2 ${
                userAnswers[index] === question.correctAnswer 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                <span className="flex items-center">
                  {userAnswers[index] === question.correctAnswer ? (
                    <div className="flex items-center text-green-600">
                      <Check className="w-5 h-5 mr-1" />
                      <span className="font-medium">Correct</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <X className="w-5 h-5 mr-1" />
                      <span className="font-medium">Incorrect</span>
                    </div>
                  )}
                </span>
              </div>
              
              <p className="text-gray-800 mb-4">{question.question}</p>
              
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div 
                    key={optionIndex}
                    className={`p-3 rounded-lg ${
                      optionIndex === question.correctAnswer
                        ? 'bg-green-200 text-green-800'
                        : optionIndex === userAnswers[index]
                        ? 'bg-red-200 text-red-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {optionIndex === question.correctAnswer && (
                        <span className="text-sm font-medium">
                          Correct Answer
                        </span>
                      )}
                      {optionIndex === userAnswers[index] && 
                       optionIndex !== question.correctAnswer && (
                        <span className="text-sm font-medium">
                          Your Answer
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">
            Question {currentQuestion + 1}/{questions.length}
          </span>
          <span className="font-semibold text-blue-600">Score: {score}</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>

      <div className="space-y-4">
        {currentQ.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={answered}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200
              ${
                answered
                  ? index === currentQ.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : index === selectedAnswer
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200'
                  : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
              }
              ${!answered && 'hover:shadow-md'}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {answered && (
                <span>
                  {index === currentQ.correctAnswer ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : index === selectedAnswer ? (
                    <X className="w-5 h-5 text-red-500" />
                  ) : null}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-500 text-center">
        {answered && selectedAnswer === currentQ.correctAnswer ? (
          <span className="text-green-600">Correct! +2 points</span>
        ) : answered ? (
          <span className="text-red-600">Incorrect! No points awarded</span>
        ) : (
          <span>Select your answer</span>
        )}
      </div>
    </div>
  );
};

export default Quiz;