import { filled, Game, INITIAL_GAME } from './game';

export type IndexedGame = Game & { index: number };

export type GameHistory = IndexedGame[];

export const historyIndexOf = ({ board }: Game) => board.filter(filled).length;

const shouldRewriteHistory = (history: GameHistory, game: Game): boolean => historyIndexOf(game) !== history.length;

const rewrite = (history: GameHistory, game: Game, index: number): GameHistory => [
  ...history.slice(0, index),
  { ...game, index }
];

const isDifferentCoordinatesThan =
  (game: Game) =>
  ({ coordinates }: IndexedGame): boolean =>
    coordinates?.x !== game.coordinates?.x || coordinates?.y !== game.coordinates?.y;

const canAddToHistory = (history: GameHistory, game: Game): boolean => history.every(isDifferentCoordinatesThan(game));

const addToHistory = (history: GameHistory, game: Game): GameHistory =>
  canAddToHistory(history, game) ? [...history, { ...game, index: history.length }] : history;

export const sortHistory = (history: GameHistory, reverseHistory: boolean = false) =>
  [...history].sort((a: IndexedGame, b: IndexedGame): number => (reverseHistory ? b.index - a.index : a.index - b.index));

export const GameHistory = (history: GameHistory, game: Game): GameHistory =>
  shouldRewriteHistory(history, game) ? rewrite(history, game, historyIndexOf(game)) : addToHistory(history, game);

export const INITIAL_HISTORY: GameHistory = GameHistory([], { ...INITIAL_GAME });
