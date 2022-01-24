export interface Questions {
  level: string;
  category: string;
  answers: string[];
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Result {
  level: string;
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
}

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}
