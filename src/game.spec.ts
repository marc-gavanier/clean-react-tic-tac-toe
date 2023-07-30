import { describe, expect, it } from 'vitest';
import {
  EMPTY,
  Game,
  play,
  X,
  O,
  NOT_FINISHED,
  X_WINNER,
  Empty,
  O_WINNER,
  DRAW,
  Board,
  Sequence,
  Square,
  squareAt,
  INITIAL_GAME,
  isInWinSequence
} from './game';

const EMPTY_LINE: [Empty, Empty, Empty] = [EMPTY, EMPTY, EMPTY];

describe('tic tac toe game system', (): void => {
  it('should get empty game board', (): void => {
    expect(INITIAL_GAME.board).toStrictEqual([...EMPTY_LINE, ...EMPTY_LINE, ...EMPTY_LINE]);
  });

  it('should get bord with X mark at 0;0', (): void => {
    const firstPlay: Game = play(INITIAL_GAME, { x: 0, y: 0 });

    expect(firstPlay.board).toStrictEqual([X, EMPTY, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE]);
  });

  it('should get bord with X mark at 2;2', (): void => {
    const firstPlay: Game = play(INITIAL_GAME, { x: 2, y: 2 });

    expect(firstPlay.board).toStrictEqual([...EMPTY_LINE, ...EMPTY_LINE, EMPTY, EMPTY, X]);
  });

  it('should get bord with X mark at 0;0 and O mark at 0;1', (): void => {
    const firstPlay: Game = play(INITIAL_GAME, { x: 0, y: 0 });
    const secondPlay: Game = play(firstPlay, { x: 0, y: 1 });

    expect(secondPlay.board).toStrictEqual([X, EMPTY, EMPTY, O, EMPTY, EMPTY, ...EMPTY_LINE]);
  });

  it('should not play in a square that have already been played', (): void => {
    const firstPlay: Game = play(INITIAL_GAME, { x: 0, y: 0 });
    const secondPlay: Game = play(firstPlay, { x: 0, y: 0 });

    expect(secondPlay.board).toStrictEqual([X, EMPTY, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE]);
  });

  it('should get not finished game end when not played', (): void => {
    expect(INITIAL_GAME.state).toBe(NOT_FINISHED);
  });

  it('should simulate game and get X winner', (): void => {
    const move1: Game = play(INITIAL_GAME, { x: 0, y: 0 });
    const move2: Game = play(move1, { x: 1, y: 0 });
    const move3: Game = play(move2, { x: 0, y: 1 });
    const move4: Game = play(move3, { x: 2, y: 0 });
    const move5: Game = play(move4, { x: 0, y: 2 });

    expect(move5.state).toBe(X_WINNER);
  });

  it('should simulate game and get O winner', (): void => {
    const move1: Game = play(INITIAL_GAME, { x: 0, y: 0 });
    const move2: Game = play(move1, { x: 1, y: 0 });
    const move3: Game = play(move2, { x: 0, y: 1 });
    const move4: Game = play(move3, { x: 1, y: 1 });
    const move5: Game = play(move4, { x: 2, y: 2 });
    const move6: Game = play(move5, { x: 1, y: 2 });

    expect(move6.state).toBe(O_WINNER);
  });

  it('should get X winner with first row', (): void => {
    const board: Board = [X, X, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE];
    const finalMove: Game = play(Game(board), { x: 2, y: 0 });

    expect(finalMove.state).toBe(X_WINNER);
  });

  it('should get X winner with second row', (): void => {
    const board: Board = [...EMPTY_LINE, X, X, EMPTY, ...EMPTY_LINE];
    const finalMove: Game = play(Game(board), { x: 2, y: 1 });

    expect(finalMove.state).toBe(X_WINNER);
  });

  it('should get X winner with third row', (): void => {
    const board: Board = [...EMPTY_LINE, ...EMPTY_LINE, X, EMPTY, X];
    const finalMove: Game = play(Game(board), { x: 1, y: 2 });

    expect(finalMove.state).toBe(X_WINNER);
  });

  it('should get X winner with second column', (): void => {
    const board: Board = [EMPTY, X, EMPTY, EMPTY, X, EMPTY, ...EMPTY_LINE];
    const finalMove: Game = play(Game(board), { x: 1, y: 2 });

    expect(finalMove.state).toBe(X_WINNER);
  });

  it('should get X winner with third column', (): void => {
    const board: Board = [EMPTY, EMPTY, X, EMPTY, EMPTY, X, ...EMPTY_LINE];
    const finalMove: Game = play(Game(board), { x: 2, y: 2 });

    expect(finalMove.state).toBe(X_WINNER);
  });

  it('should get X winner with first diagonal', (): void => {
    const board: Board = [X, EMPTY, EMPTY, EMPTY, X, EMPTY, ...EMPTY_LINE];
    const finalMove: Game = play(Game(board), { x: 2, y: 2 });

    expect(finalMove.state).toBe(X_WINNER);
  });

  it('should get X winner with second diagonal', (): void => {
    const board: Board = [EMPTY, EMPTY, X, EMPTY, X, EMPTY, ...EMPTY_LINE];
    const finalMove: Game = play(Game(board), { x: 0, y: 2 });

    expect(finalMove.state).toBe(X_WINNER);
  });

  it('should simulate game and get draw', (): void => {
    const move1: Game = play(INITIAL_GAME, { x: 1, y: 0 });
    const move2: Game = play(move1, { x: 0, y: 0 });
    const move3: Game = play(move2, { x: 0, y: 1 });
    const move4: Game = play(move3, { x: 2, y: 0 });
    const move5: Game = play(move4, { x: 1, y: 1 });
    const move6: Game = play(move5, { x: 2, y: 1 });
    const move7: Game = play(move6, { x: 0, y: 2 });
    const move8: Game = play(move7, { x: 1, y: 2 });
    const move9: Game = play(move8, { x: 2, y: 2 });

    expect(move9.state).toBe(DRAW);
  });

  it('should not play when game is finished', (): void => {
    const board: Board = [X, EMPTY, EMPTY, EMPTY, X, EMPTY, ...EMPTY_LINE];
    const finalMove: Game = play(Game(board), { x: 2, y: 2 });
    const illegalMove: Game = play(finalMove, { x: 2, y: 0 });

    expect(illegalMove.board).toStrictEqual([X, EMPTY, EMPTY, EMPTY, X, EMPTY, EMPTY, EMPTY, X]);
  });

  it('should get 2,4,6 win sequence for X winner', (): void => {
    const board: Board = [EMPTY, EMPTY, X, EMPTY, X, EMPTY, ...EMPTY_LINE];
    const finalMove: Game = play(Game(board), { x: 0, y: 2 });

    expect(finalMove.winSequence).toStrictEqual<Sequence>([2, 4, 6]);
  });

  it('should get 1,4,7 win sequence for O winner', (): void => {
    const board: Board = [EMPTY, O, EMPTY, EMPTY, O, EMPTY, ...EMPTY_LINE];
    const xMove: Game = play(Game(board), { x: 2, y: 2 });
    const finalMove: Game = play(xMove, { x: 1, y: 2 });

    expect(finalMove.winSequence).toStrictEqual<Sequence>([1, 4, 7]);
  });

  it('should get value from board at 2,0', (): void => {
    const board: Board = [X, X, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE];
    const move: Game = play(Game(board), { x: 2, y: 0 });
    const square: Square = squareAt(move, { x: 2, y: 0 });

    expect(square).toBe(X);
  });

  it('should get coordinates played at 0;0', (): void => {
    const firstPlay: Game = play(INITIAL_GAME, { x: 0, y: 0 });

    expect(firstPlay.coordinates).toStrictEqual({ x: 0, y: 0 });
  });

  it('should detect that a square is not in a win sequence', (): void => {
    const board: Board = [EMPTY, EMPTY, X, EMPTY, X, EMPTY, ...EMPTY_LINE];
    const finalMove: Game = play(Game(board), { x: 0, y: 2 });

    expect(isInWinSequence(finalMove, { x: 0, y: 0 })).toBe(false);
  });

  it('should detect that a square is in a win sequence', (): void => {
    const board: Board = [EMPTY, EMPTY, X, EMPTY, X, EMPTY, ...EMPTY_LINE];
    const finalMove: Game = play(Game(board), { x: 0, y: 2 });

    expect(isInWinSequence(finalMove, { x: 0, y: 2 })).toBe(true);
  });
});
