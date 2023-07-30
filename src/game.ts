export type SquareIndex = 0 | 1 | 2;
export type Coordinates = { x: SquareIndex; y: SquareIndex };
export type Square = Empty | X | O;
type BoardIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Sequence = [BoardIndex, BoardIndex, BoardIndex];
type NotFinished = 'Not Finished';
type XWinner = 'Winner: X';
type OWinner = 'Winner: O';
type Draw = 'Draw';
type State = { state: XWinner | OWinner; winSequence: Sequence } | { state: Draw | NotFinished; winSequence?: never };

export type Empty = '';
type X = 'X';
type O = 'O';
export type Board = Square[];
export type Game = { board: Board; coordinates?: Coordinates } & State;

export const NOT_FINISHED: NotFinished = 'Not Finished';
export const X_WINNER: XWinner = 'Winner: X';
export const O_WINNER: OWinner = 'Winner: O';
export const DRAW: Draw = 'Draw';
export const EMPTY: Empty = '';
export const X: X = 'X';
export const O: O = 'O';

const WIDTH: 3 = 3 as const;

const EMPTY_BOARD: Board = new Array(WIDTH * WIDTH).fill(EMPTY);

const WIN_SEQUENCES: Sequence[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export const SQUARE_LINE: [SquareIndex, SquareIndex, SquareIndex] = [0, 1, 2];

const hasWinSequence =
  (board: Board) =>
  ([square1, square2, square3]: Sequence): boolean =>
    board[square1] === board[square2] && board[square1] === board[square3] && board[square1] !== EMPTY;

const winner = (player: X | O): XWinner | OWinner => (player === X ? X_WINNER : O_WINNER);

const winnerState = (player: X | O, winSequence: Sequence): State => ({ state: winner(player), winSequence });

const noWinnerState = (board: Square[]): State => (board.every(filled) ? { state: DRAW } : { state: NOT_FINISHED });

const withState = (board: Board, player: X | O) =>
  ((winSequence: Sequence | false = false): State => (winSequence ? winnerState(player, winSequence) : noWinnerState(board)))(
    WIN_SEQUENCES.find(hasWinSequence(board))
  );

const alreadyPlayed = (square: Square): boolean => square !== EMPTY;

const isXTurn = (board: Board): boolean => board.filter(alreadyPlayed).length % 2 === 0;

const previousPlayerMark = (board: Board): X | O => (isXTurn(board) ? O : X);

const squareIndexFor = ({ x, y }: Coordinates): BoardIndex => (y * WIDTH + x) as BoardIndex;

const playedAt = (index: number, coordinates: Coordinates): boolean => index === squareIndexFor(coordinates);

const toNextBoard =
  (coordinates: Coordinates, board: Board) =>
  (square: Square, index: number): Square =>
    playedAt(index, coordinates) ? playerMark(board) : square;

const canPlay = ({ state }: Game): boolean => state === NOT_FINISHED;

const isAvailableSquare = ({ board }: Game, coordinates: Coordinates): boolean =>
  board.some((square: Square, index: number): boolean => square === EMPTY && squareIndexFor(coordinates) === index);

export const filled = (square: Square): boolean => square !== EMPTY;

export const playerMark = (board: Board): X | O => (isXTurn(board) ? X : O);

export const play = (game: Game, coordinates: Coordinates): Game =>
  canPlay(game) && isAvailableSquare(game, coordinates)
    ? Game(game.board.map(toNextBoard(coordinates, game.board)), coordinates)
    : game;

export const squareAt = ({ board }: Game, coordinates: Coordinates): Square => board.at(squareIndexFor(coordinates)) ?? EMPTY;

export const Game = (board: Board, coordinates?: Coordinates): Game => ({
  board,
  ...withState(board, previousPlayerMark(board)),
  ...(coordinates ? { coordinates } : {})
});

export const isInWinSequence = ({ winSequence }: Game, coordinates: Coordinates): boolean =>
  winSequence?.includes(squareIndexFor(coordinates)) ?? false;

export const INITIAL_GAME: Game = Game(EMPTY_BOARD);
