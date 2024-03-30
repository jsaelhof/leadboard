export type Player = {
  id: string;
  name: string;
  color: string;
};

export type Game = {
  id: string;
  name: string;
};

export type Result = {
  id: string;
  players: string[];
  winner: string;
  game: string;
  date: string;
};

export type DB = {
  player: Player[];
  game: Game[];
  results: Result[];
};
