import { create } from "zustand";

export interface Answer {
  question: string;
  options: string[];
  answer: string;
  userAnswer: string;
}

interface ExamStore {
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
  submissionResponse: any;
  setSubmissionResponse: (response: any) => void;
}

export const useAnswersStore = create<ExamStore>((set) => ({
  answers: [],
  setAnswers: (answers) => set({ answers }),
  submissionResponse: null,
  setSubmissionResponse: (response) => set({ submissionResponse: response }),
}));
