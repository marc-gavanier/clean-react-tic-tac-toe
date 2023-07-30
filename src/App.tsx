import { Dispatch, JSX, SetStateAction, useState } from 'react';
import styles from './App.module.scss';
import {
  SquareIndex,
  Game,
  playerMark,
  SQUARE_LINE,
  squareAt,
  INITIAL_GAME,
  NOT_FINISHED,
  Coordinates,
  isInWinSequence
} from './game';
import { GameHistory, historyIndexOf, IndexedGame, INITIAL_HISTORY, sortHistory } from './game-history';
import { play } from './game';

type SquareProps = { game: Game; coordinates: Coordinates; onSelectSquare: (game: Game) => void };

const Square = ({ game, coordinates, onSelectSquare }: SquareProps): JSX.Element => (
  <button
    className={[styles['square'], ...[isInWinSequence(game, coordinates) ? styles['win-sequence'] : []]].join(' ')}
    onClick={() => onSelectSquare(play(game, coordinates))}>
    {squareAt(game, coordinates)}
  </button>
);

type BoardProps = { game: Game; onSelectSquare: (game: Game) => void };

const Board = ({ game, onSelectSquare }: BoardProps): JSX.Element => (
  <div>
    <div className={styles['status']}>
      {game.state === NOT_FINISHED ? `Next player: ${playerMark(game.board)}` : game.state}
    </div>
    {SQUARE_LINE.map((y: SquareIndex) => (
      <div key={`column-${y}`} className={styles['board-row']}>
        {SQUARE_LINE.map((x: SquareIndex) => (
          <Square key={`square-${x}-${y}`} game={game} coordinates={{ x, y }} onSelectSquare={onSelectSquare}></Square>
        ))}
      </div>
    ))}
  </div>
);

type CurrentMoveProps = { move: IndexedGame };

const CurrentMove = ({ move }: CurrentMoveProps): JSX.Element => (
  <>
    {move.index > 0
      ? `You are at move #${move.index} (${move.coordinates?.x}, ${move.coordinates?.y})`
      : 'You are at game start'}
  </>
);

type MoveInHistoryProps = { history: IndexedGame[]; move: IndexedGame; onSelectMove: (game?: Game) => void };

const MoveInHistory = ({ history, move, onSelectMove }: MoveInHistoryProps): JSX.Element => (
  <button onClick={() => onSelectMove(history[move.index])}>
    {move.index > 0 ? `Go to move #${move.index} (${move.coordinates?.x}, ${move.coordinates?.y})` : 'Go to game start'}
  </button>
);

type GameInfoProps = { curentMove: Game; history: GameHistory; onSelectMove: (game?: Game) => void };

const GameInfo = ({ curentMove, history, onSelectMove }: GameInfoProps): JSX.Element => {
  const [reverseHistory, setReverseHistory]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

  const handleReverseHistory = (): void => setReverseHistory(!reverseHistory);

  return (
    <div className={styles['game-info']}>
      {history.length > 1 && (
        <button onClick={() => handleReverseHistory()}>
          Sort history in {reverseHistory ? 'ascending' : 'descending'} order
        </button>
      )}
      <ol>
        {sortHistory(history, reverseHistory).map(
          (move: IndexedGame): JSX.Element => (
            <li key={`history-${move.index}`}>
              {move.index === historyIndexOf(curentMove) ? (
                <CurrentMove move={move}></CurrentMove>
              ) : (
                <MoveInHistory history={history} move={move} onSelectMove={onSelectMove} />
              )}
            </li>
          )
        )}
      </ol>
    </div>
  );
};
const App = (): JSX.Element => {
  const [history, setHistory]: [GameHistory, Dispatch<SetStateAction<GameHistory>>] = useState<GameHistory>(INITIAL_HISTORY);
  const [game, setGame]: [Game, Dispatch<SetStateAction<Game>>] = useState<Game>(INITIAL_GAME);

  const handleSelectSquare = (move: Game): void => {
    setGame(move);
    setHistory(GameHistory(history, move));
  };

  const handleSelectMove = (move?: Game): void => move && setGame(move);

  return (
    <main>
      <h1>Tic-Tac-Toe</h1>
      <div className={styles['game']}>
        <Board game={game} onSelectSquare={handleSelectSquare}></Board>
        <GameInfo curentMove={game} history={history} onSelectMove={handleSelectMove}></GameInfo>
      </div>
    </main>
  );
};

export default App;
