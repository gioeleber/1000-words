export interface Word {
  key: number;
  jap: string;
  eng: string[];
}

export interface Game {
  session: number;
  count: null | number;
  answers: { key: number; answer: boolean }[];
}
