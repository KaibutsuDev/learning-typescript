"use client";

import { useState, useEffect, useCallback } from 'react';
import { QuizQuestion } from '@/src/components/Quiz';

export interface UseQuizProps {
  questions: QuizQuestion[];
  lessonId: string;
  onComplete?: (score: number, total: number) => void;
}

export function useQuiz({ questions, lessonId, onComplete }: UseQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Reset quiz when questions or lessonId change
  useEffect(() => {
    setCurrentQuestionIndex(0);
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
  }, [showResult, score, questions.length, onComplete]);

  const handleOptionSelect = useCallback((index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  }, [isAnswered]);

  const handleVerify = useCallback(() => {
    if (selectedOption === null || isAnswered) return;

    setIsAnswered(true);
    if (selectedOption === questions[currentQuestionIndex].correct) {
      setScore(prev => prev + 1);
    }
  }, [selectedOption, isAnswered, questions, currentQuestionIndex]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  }, [currentQuestionIndex, questions.length]);

  const handleRestart = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  }, []);

  return {
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex],
    selectedOption,
    isAnswered,
    score,
    showResult,
    handleOptionSelect,
    handleVerify,
    handleNext,
    handleRestart,
    totalQuestions: questions.length
  };
}
