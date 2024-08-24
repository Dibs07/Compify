import { create } from "zustand";

interface PyqState {
  pyq: boolean;
  setPyq: (pyq: boolean) => void;
}

interface MediumState {
  medium: "easy" | "medium" | "hard";
  setMedium: (medium: "easy" | "medium" | "hard") => void;
}

interface QuestionState {
  numberOfQuestions: number;
  setNumberOfQuestions: (numberOfQuestions: number) => void;
}

interface MinutesState {
  minutesPerQuestion: number;
  setMinutesPerQuestion: (minutesPerQuestion: number) => void;
}

export const useExamStore = create<
  PyqState & MediumState & QuestionState & MinutesState
>()((set) => ({
  pyq: false,
  setPyq: (pyq) => set(() => ({ pyq })),

  medium: "easy",
  setMedium: (medium) => set(() => ({ medium })),

  numberOfQuestions: 0,
  setNumberOfQuestions: (numberOfQuestions) =>
    set(() => ({ numberOfQuestions })),

  minutesPerQuestion: 2,
  setMinutesPerQuestion: (minutesPerQuestion) =>
    set(() => ({ minutesPerQuestion })),
}));
