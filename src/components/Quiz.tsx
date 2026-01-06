"use client";

import { useState, useEffect } from 'react';
import { CheckIcon, XIcon, QuestionMarkCircleIcon, TrophyIcon } from './icons';
import { useLanguage } from '@/src/i18n/LanguageContext';

// ========================================
// 📋 TYPES
// ========================================

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  lessonId: string;
  onComplete?: (score: number, total: number) => void;
}

// ========================================
// 🧩 MAIN COMPONENT
// ========================================

export default function Quiz({ questions, lessonId, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { t } = useLanguage();

  // Reset quiz when questions change
  useEffect(() => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  }, [questions, lessonId]);

  // Notify on completion
  useEffect(() => {
    if (showResult && questions.length > 0) {
      onComplete?.(score, questions.length);
    }
  }, [showResult, score, questions, onComplete]);

  if (!questions || questions.length === 0) return null;

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const checkAnswer = () => {
    setIsAnswered(true);
    if (selectedOption === questions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  // Results screen
  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 60;

    return (
      <div className="quiz-result">
        <div className="quiz-trophy">
          <TrophyIcon />
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          {passed ? t.quiz.completed : t.quiz.good_try}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          {t.quiz.score_text} <strong>{score}</strong> {t.quiz.of} <strong>{questions.length}</strong> {t.quiz.correct_answers}.
        </p>
        
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${percentage}%` }} />
        </div>
        
        <p className="text-lg font-semibold mb-6" style={{ color: passed ? 'var(--success)' : 'var(--error)' }}>
          {percentage}%
        </p>

        {!passed && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            {t.quiz.min_score}
          </p>
        )}

        <button
          onClick={resetQuiz}
          className="px-6 py-3 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
        >
          {passed ? t.quiz.review : t.quiz.retry}
        </button>
      </div>
    );
  }

  // Questions screen
  const question = questions[currentQuestion];
  const isCorrect = isAnswered && selectedOption === question.correct;

  return (
    <div className="quiz-container">
      {/* Header */}
      <div className="quiz-header">
        <div className="quiz-icon">
          <QuestionMarkCircleIcon />
        </div>
        <h3 className="flex-1 text-lg font-semibold text-zinc-900 dark:text-white">
          {t.quiz.title}
        </h3>
        <span className="quiz-counter">
          {t.quiz.question} {currentQuestion + 1} {t.quiz.of} {questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="quiz-question">{question.question}</div>

      {/* Options */}
      <div className="quiz-options">
        {question.options.map((option, index) => {
          let optionClass = 'quiz-option';
          if (selectedOption === index) optionClass += ' selected';
          if (isAnswered) {
            if (index === question.correct) optionClass += ' correct';
            else if (index === selectedOption && index !== question.correct) optionClass += ' wrong';
          }

          return (
            <button
              key={index}
              className={optionClass}
              onClick={() => handleOptionClick(index)}
              disabled={isAnswered}
            >
              <div className="quiz-radio" />
              <span className="flex-1">{option}</span>
              {isAnswered && index === question.correct && (
                <span className="text-green-500"><CheckIcon /></span>
              )}
              {isAnswered && index === selectedOption && index !== question.correct && (
                <span className="text-red-500"><XIcon /></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div className={`quiz-feedback ${isCorrect ? 'success' : 'error'}`}>
          <p className="text-sm">
            <strong className={isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {isCorrect ? t.quiz.correct : t.quiz.incorrect}
            </strong>{' '}
            <span className="text-zinc-600 dark:text-zinc-300">{question.explanation}</span>
          </p>
          <button className="quiz-btn mt-4" onClick={nextQuestion}>
            {currentQuestion < questions.length - 1 ? t.quiz.next_question : t.quiz.view_results}
          </button>
        </div>
      )}

      {/* Verify Button */}
      {!isAnswered && (
        <button
          className="quiz-btn"
          disabled={selectedOption === null}
          onClick={checkAnswer}
        >
          {t.quiz.check_answer}
        </button>
      )}
    </div>
  );
}
