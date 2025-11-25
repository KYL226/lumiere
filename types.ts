export interface ReadingPlanItem {
  id: string;
  day: number;
  passage: string;
  completed: boolean;
  date: string;
}

export interface Verse {
  id: string;
  reference: string;
  text: string;
  topic: string;
  status: 'new' | 'learning' | 'mastered';
  lastReviewed?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  completed: boolean;
  score?: number;
}

export type View = 'dashboard' | 'reading' | 'memorization' | 'journal' | 'stats' | 'settings' | 'quiz';

export interface UserStats {
  streak: number;
  totalChaptersRead: number;
  versesMemorized: number;
  quizScoreAverage: number;
  booksCompleted: number;
}