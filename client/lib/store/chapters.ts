import { create } from "zustand";

interface ChapterState {
  chapter: string[] | undefined;
  setChapter: (chapter: string[] | undefined) => void;
}

export const useChapter = create<ChapterState>()((set) => ({
  chapter: [''],
  setChapter: (chapter) => set(() => ({ chapter })),
}));
