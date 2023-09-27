export enum ReqStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

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

export type Games = Record<string, Game>;

export interface Day {
  key: number;
  jap: string;
  eng: string[];
}

export interface Game {
  day?: number;
  session: number;
  fase: GameFase;
  words: Word[];
  answers: { key: number; answer: boolean }[];
  lastCompletion?: string | null;
  level: number;
}
