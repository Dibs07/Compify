import { create } from "zustand";

interface ExamState {
  exam: string | undefined;
  setExam: (exam: string | undefined) => void;
}

export const useExam = create<ExamState>()((set) => ({
  exam: '',
  setExam: (exam) => set(() => ({ exam })),
}));