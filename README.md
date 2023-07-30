# Clean React Tic-Tac-Toe

<h2 id="about">🪧 About</h2>

This project is an alternative implementation of the [Tic-Tac-Toe tutorial found in the React documentation](https://react.dev/learn/tutorial-tic-tac-toe).
After completing the tutorial, I felt unsatisfied with the provided implementation and decided to create my own version.
The primary goal was to isolate the logic from the React components, adhering to a pure TypeScript and dependency-free coding style for the core game and history features.
On the other hand, the React components were designed to solely utilize business logic without any additional game-related logic, focusing only on the presentation and rendering aspects.

By taking this approach, the project aims to provide a clear separation of concerns and maintain a clean codebase.

I hope that it can serve as a source of inspiration for developers starting with React who are interested in developing the Tic-Tac-Toe tutorial in a clean way.

Feel free to explore and provide feedback to make it even cleaner.

## 📑 Table of Contents

- 🪧 [About](#about)
- ✨ [Features](#features)
- 🧭 [Usages](#usages)
- 🎬 [Demo](#demo)
- 🤗 [Contributing](#contributing)
- 📝 [License](#license)

<h2 id="features">✨ Features</h2>

- **Classic Tic-Tac-Toe Gameplay**: Enjoy the timeless fun of the traditional Tic-Tac-Toe game, where two players take turns to place their marks (X or O) on a 3x3 grid, aiming to create a line of three marks in a row, column, or diagonal to win the game.
- **Time Travel with History**: Experience the added thrill of time travel by utilizing the history feature. Go back to previous states of the game board and explore different strategies to outsmart your opponent.

<h2 id="usages">🧭 Usages</h2>

- **Placing X or O**: To start the game, simply click on any of the empty squares in the 3x3 grid to place your mark. Players take turns to make their moves, and the game will automatically alternate between "X" and "O" for each turn. Keep an eye on the message above the board to know whose turn it is.
- **Time Travel with History**: As you play the game and make moves, the history list on the right side will keep track of each move made during the session. To revisit a previous state of the game, click on any move's button in the history list. The game board will update to display the board state at that specific move, allowing you to explore different paths and strategies.
- **Sort Move History**: Use the toggle button located above the history list to switch between sorting the moves in ascending or descending order.
- **Game End**: The game stops when one of the players completes a winning combination, or when all squares on the board are filled without a winner. The result displayed above the board indicates the player who achieved the winning combination first, or declares a draw if no winning combination is achieved.

<h2 id="demo">🎬 Demo</h2>

Check out the [live demo of the Clean React Tic-Tac-Toe](https://marc-gavanier.github.io/clean-react-tic-tac-toe/)

Feel free to play the game and explore its features in action! 🚀

<h2 id="contributing">🤗 Contributing</h2>

See the repository's [contribution guide](./CONTRIBUTING.md) to know more about how to run it locally.

<h2 id="license">📝 License</h2>

See the repository's [LICENSE.md](./LICENSE.md) file.
