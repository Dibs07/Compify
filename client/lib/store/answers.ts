import { create } from "zustand";

interface Answer {
  question: string;
  options: string[];
  answer: string;
  userAnswer:string;
}

interface AnswerState {
  answers: Answer[] | null;
  setAnswers: (questions: Answer[] | undefined) => void;
}

export const userAnswers = create<AnswerState>((set) => ({
    answers: null,
    setAnswers: (answers) => set(() => ({ answers })),
}));
