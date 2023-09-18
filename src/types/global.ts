export interface Word {
  key: number;
  jap: string;
  eng: string[];
}

export enum GameFase {
  PREPARATION = "preparation",
  QUIZ = "quiz",
  SCORE = "score",
}

export interface Game {
  session: number;
  fase: GameFase;
  words: Word[];
  answers: { key: number; answer: boolean }[];
}

export interface Level {
  lastCompletion?: string | null;
  day: number;
}
