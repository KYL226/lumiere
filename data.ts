import { ReadingPlanItem, Verse, JournalEntry, Quiz, UserStats } from './types';

export const userStats: UserStats = {
  streak: 12,
  totalChaptersRead: 342,
  versesMemorized: 28,
  quizScoreAverage: 85,
  booksCompleted: 5
};

export const readingPlanData: ReadingPlanItem[] = Array.from({ length: 60 }, (_, i) => {
  const books = ['Genèse', 'Exode', 'Psaumes', 'Proverbes', 'Matthieu', 'Jean', 'Romains'];
  const book = books[i % books.length];
  const chapter = (i % 28) + 1;
  const isPast = i < 15;
  return {
    id: `reading-${i}`,
    day: i + 1,
    passage: `${book} ${chapter}`,
    completed: isPast, // First 15 days completed
    date: new Date(Date.now() - (15 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };
});

export const versesData: Verse[] = [
  { id: 'v1', reference: 'Jean 3:16', text: 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique...', topic: 'Amour', status: 'mastered' },
  { id: 'v2', reference: 'Philippiens 4:13', text: 'Je puis tout par celui qui me fortifie.', topic: 'Force', status: 'mastered' },
  { id: 'v3', reference: 'Psaumes 23:1', text: 'L\'Éternel est mon berger: je ne manquerai de rien.', topic: 'Confiance', status: 'learning' },
  { id: 'v4', reference: 'Romains 8:28', text: 'Nous savons, du reste, que toutes choses concourent au bien...', topic: 'Espérance', status: 'learning' },
  { id: 'v5', reference: 'Proverbes 3:5', text: 'Confie-toi en l\'Éternel de tout ton cœur...', topic: 'Sagesse', status: 'new' },
  { id: 'v6', reference: 'Ésaïe 41:10', text: 'Ne crains rien, car je suis avec toi...', topic: 'Courage', status: 'new' },
];

export const journalEntries: JournalEntry[] = [
  { id: 'j1', date: '2023-10-24', title: 'Réflexion sur la Genèse', content: 'La création montre la puissance infinie de Dieu. Je suis frappé par l\'ordre dans le chaos.', tags: ['Création', 'Puissance'] },
  { id: 'j2', date: '2023-10-25', title: 'Prière pour la famille', content: 'Seigneur, garde ma famille unie et en bonne santé. Donne-nous la sagesse.', tags: ['Prière', 'Famille'] },
];

export const quizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'Les Évangiles',
    completed: false,
    questions: [
      {
        id: 'qq1',
        question: 'Combien y a-t-il d\'évangiles dans le Nouveau Testament ?',
        options: ['3', '4', '5', '12'],
        correctAnswer: 1
      },
      {
        id: 'qq2',
        question: 'Quel disciple a marché sur l\'eau avec Jésus ?',
        options: ['Jean', 'Judas', 'Pierre', 'Jacques'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'q2',
    title: 'L\'Ancien Testament',
    completed: true,
    score: 100,
    questions: [
      {
        id: 'qt1',
        question: 'Qui a construit l\'arche ?',
        options: ['Moïse', 'Noé', 'Abraham', 'David'],
        correctAnswer: 1
      }
    ]
  }
];

// Data for charts
export const booksCompletedData = [
  { name: 'Pentateuque', value: 2 },
  { name: 'Historiques', value: 1 },
  { name: 'Poétiques', value: 1 },
  { name: 'Prophètes', value: 0 },
  { name: 'Évangiles', value: 1 },
  { name: 'Épîtres', value: 0 },
];

export const themesData = [
  { name: 'Amour', value: 30 },
  { name: 'Foi', value: 25 },
  { name: 'Sagesse', value: 20 },
  { name: 'Espérance', value: 15 },
  { name: 'Prophétie', value: 10 },
];

export const streakData = [
  { day: 'Lun', pages: 3 },
  { day: 'Mar', pages: 5 },
  { day: 'Mer', pages: 2 },
  { day: 'Jeu', pages: 4 },
  { day: 'Ven', pages: 6 },
  { day: 'Sam', pages: 8 },
  { day: 'Dim', pages: 5 },
];

export const memorizationProgressData = [
  { name: 'Maîtrisés', value: 15 },
  { name: 'En cours', value: 8 },
  { name: 'À apprendre', value: 20 },
];

export const topicsExploredData = [
  { subject: 'Prière', A: 120, fullMark: 150 },
  { subject: 'Jeûne', A: 98, fullMark: 150 },
  { subject: 'Charité', A: 86, fullMark: 150 },
  { subject: 'Pardon', A: 99, fullMark: 150 },
  { subject: 'Louange', A: 85, fullMark: 150 },
  { subject: 'Service', A: 65, fullMark: 150 },
];
