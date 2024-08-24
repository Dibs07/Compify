import { create } from "zustand";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuestionsState {
  questions: Question[] | undefined;
  setQuestions: (questions: Question[] | undefined) => void;
}

export const useQuestions = create<QuestionsState>((set) => ({
  questions: undefined,
  setQuestions: (questions) => set(() => ({ questions })),
}));
