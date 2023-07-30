import { describe, expect, it } from 'vitest';
import { GameHistory, historyIndexOf, INITIAL_HISTORY, sortHistory } from './game-history';
import { EMPTY, Empty, Game, INITIAL_GAME, NOT_FINISHED, O, play, X } from './game';

const EMPTY_LINE: [Empty, Empty, Empty] = [EMPTY, EMPTY, EMPTY];

describe('tic tac toe game history', (): void => {
  it('should start with an empty game in history', (): void => {
    expect(INITIAL_HISTORY).toStrictEqual<GameHistory>([
      {
        board: [...EMPTY_LINE, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        index: 0
      }
    ]);
  });

  it('should add game to history', (): void => {
    const game: Game = play(INITIAL_GAME, { x: 0, y: 0 });

    const nextHistory: GameHistory = GameHistory(INITIAL_HISTORY, game);

    expect(nextHistory).toStrictEqual<GameHistory>([
      {
        board: [...EMPTY_LINE, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        index: 0
      },
      {
        board: [X, EMPTY, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        coordinates: { x: 0, y: 0 },
        index: 1
      }
    ]);
  });

  it('should not add game to history when square has already been filled', (): void => {
    const game: Game = play(INITIAL_GAME, { x: 0, y: 0 });
    const nextHistory: GameHistory = GameHistory(INITIAL_HISTORY, game);

    const illegalGame: Game = play(game, { x: 0, y: 0 });
    const illegalHistory: GameHistory = GameHistory(nextHistory, illegalGame);

    expect(illegalHistory).toStrictEqual<GameHistory>([
      {
        board: [...EMPTY_LINE, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        index: 0
      },
      {
        board: [X, EMPTY, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        coordinates: { x: 0, y: 0 },
        index: 1
      }
    ]);
  });

  it('should get history index 0 for game', (): void => {
    const game: Game = {
      board: [...EMPTY_LINE, ...EMPTY_LINE, ...EMPTY_LINE],
      state: NOT_FINISHED
    };

    const index: number = historyIndexOf(game);

    expect(index).toBe(0);
  });

  it('should get history index 1 for game', (): void => {
    const game: Game = {
      board: [X, EMPTY, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
      state: NOT_FINISHED
    };

    const index: number = historyIndexOf(game);

    expect(index).toBe(1);
  });

  it('should rewrite history when a new game has been introduced in history', (): void => {
    const firstMoveGame: Game = play(INITIAL_GAME, { x: 0, y: 0 });
    const firstMoveHistory: GameHistory = GameHistory(INITIAL_HISTORY, firstMoveGame);

    const secondMoveGame: Game = play(firstMoveGame, { x: 1, y: 0 });
    const secondMoveHistory: GameHistory = GameHistory(firstMoveHistory, secondMoveGame);

    const thirdMoveGame: Game = play(secondMoveGame, { x: 1, y: 1 });
    const thirdMoveHistory: GameHistory = GameHistory(secondMoveHistory, thirdMoveGame);

    const alternativeMoveHistory: GameHistory = GameHistory(thirdMoveHistory, secondMoveGame);

    expect(alternativeMoveHistory).toStrictEqual<GameHistory>([
      {
        board: [...EMPTY_LINE, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        index: 0
      },
      {
        board: [X, EMPTY, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        coordinates: { x: 0, y: 0 },
        index: 1
      },
      {
        board: [X, O, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        coordinates: { x: 1, y: 0 },
        index: 2
      }
    ]);
  });

  it('should sort history in ascending order', (): void => {
    const history: GameHistory = GameHistory(
      [
        {
          board: [...EMPTY_LINE, ...EMPTY_LINE, ...EMPTY_LINE],
          state: NOT_FINISHED,
          index: 0
        },
        {
          board: [X, EMPTY, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
          state: NOT_FINISHED,
          coordinates: { x: 0, y: 0 },
          index: 1
        },
        {
          board: [X, O, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
          state: NOT_FINISHED,
          coordinates: { x: 1, y: 0 },
          index: 2
        }
      ],
      {
        board: [X, O, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        coordinates: { x: 1, y: 0 }
      }
    );

    expect(sortHistory(history)).toStrictEqual([
      {
        board: [...EMPTY_LINE, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        index: 0
      },
      {
        board: [X, EMPTY, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        coordinates: { x: 0, y: 0 },
        index: 1
      },
      {
        board: [X, O, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        coordinates: { x: 1, y: 0 },
        index: 2
      }
    ]);
  });

  it('should sort history in descending order', (): void => {
    const history: GameHistory = GameHistory(
      [
        {
          board: [...EMPTY_LINE, ...EMPTY_LINE, ...EMPTY_LINE],
          state: NOT_FINISHED,
          index: 0
        },
        {
          board: [X, EMPTY, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
          state: NOT_FINISHED,
          coordinates: { x: 0, y: 0 },
          index: 1
        },
        {
          board: [X, O, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
          state: NOT_FINISHED,
          coordinates: { x: 1, y: 0 },
          index: 2
        }
      ],
      {
        board: [X, O, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        coordinates: { x: 1, y: 0 }
      }
    );

    expect(sortHistory(history, true)).toStrictEqual([
      {
        board: [X, O, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        coordinates: { x: 1, y: 0 },
        index: 2
      },
      {
        board: [X, EMPTY, EMPTY, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        coordinates: { x: 0, y: 0 },
        index: 1
      },
      {
        board: [...EMPTY_LINE, ...EMPTY_LINE, ...EMPTY_LINE],
        state: NOT_FINISHED,
        index: 0
      }
    ]);
  });
});
