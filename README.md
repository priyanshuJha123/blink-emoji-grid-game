
# Blink Tac Toe - A Frontend Developer Challenge

This project is an interactive 2-player web game based on a creative twist of Tic Tac Toe, built with React.js. It features emojis instead of Xs and Os, and a unique "vanishing emoji" rule.

**Live Deployed Link:** [Your App URL will appear here once deployed by Lovable]

## 🎮 Game Rules

### 1. **Board Structure**
*   Standard 3x3 Tic Tac Toe grid.
*   A maximum of **6 emojis** (3 per player) can be active on the board at any given time.

### 2. **Emoji Categories**
*   Each player is assigned an emoji category (e.g., Animals, Food) at the start of the game.
*   On each turn, the player receives a **random emoji from their assigned category** to place on the board.
    *   Current Categories:
        *   Animals: 🐶 🐱 🦊 🐼 🦁 🐯
        *   Food: 🍕 🍔 🍟 🍩 🍎 🍓
        *   Sports: ⚽ 🏀 🏈 🎾 🏐 🎳
        *   Faces: 😀 😂 😍 🥳 🤩 😎

### 3. **Turn-Based Play**
*   Player 1 (Orange) starts the game.
*   Players alternate turns.
*   An emoji can be placed in any empty cell that is not currently "banned" due to the vanishing rule.

### 4. **Vanishing Rule**
*   Each player is limited to having **3 of their emojis** on the board simultaneously.
*   When a player attempts to place their 4th emoji:
    *   Their **oldest emoji** (based on placement order - FIFO logic) is automatically removed from the board.
    *   The cell from which the oldest emoji was removed **cannot be used by the current player for that specific turn**. It becomes available again for subsequent turns by either player.
*   The removed emoji visually disappears, and the cell becomes empty and reusable (after the current turn's restriction).

### 5. **Winning Condition**
*   A player wins by successfully placing **3 of their emojis in a row**: horizontally, vertically, or diagonally.
*   The winning emojis must belong to the same player.

### 6. **Game Ending**
*   The game continues until a player achieves a winning combination.
*   **Draws are not possible** due to the continuous nature of play facilitated by the vanishing rule.
*   When a player wins:
    *   A message **“Player X Wins!”** is displayed.
    *   A **“Play Again”** button appears to restart the game.

## ✅ Requirements Met
*   Built with **React.js**.
*   Supports **desktop and mobile** devices with a responsive layout.
*   Clearly indicates:
    *   Whose turn it is.
    *   The active player (visually through color-coding and text).
*   Includes a **Help section** (modal dialog) explaining the game rules.

## 🛠️ Tech Stack
*   **React.js** (with TypeScript)
*   **Tailwind CSS** for styling
*   **Lucide React** for icons
*   **shadcn/ui** for UI components (Dialog, Button, Toast)

## ✨ Vanishing Feature Implementation
The "vanishing" feature is implemented as follows:
1.  Each player's placed emojis are tracked in an array (`player1Emojis`, `player2Emojis`) which stores objects containing the emoji, player ID, cell index, and a timestamp. This array acts as a queue.
2.  When a player has `MAX_EMOJIS_PER_PLAYER` (currently 3) on the board and attempts to place another emoji:
    *   The emoji at the beginning of their queue (the oldest one, determined by FIFO) is identified.
    *   Its corresponding cell on the main `board` state is set to `null` (emptied).
    *   The oldest emoji is removed from the player's emoji queue.
    *   The index of this now-empty cell is stored in a `bannedCellForNextMove` state variable. This prevents the current player from immediately placing their new emoji into the cell that was just vacated by their vanishing emoji.
3.  The new emoji is then placed in the clicked cell (if valid).
4.  After the turn completes (and before the next player's turn begins, or if the game ends), `bannedCellForNextMove` is reset to `null`, making the cell available again.

## 🚀 Potential Improvements with More Time
*   **Emoji Category Selection UI:** Allow players to choose their emoji categories before the game starts.
*   **Animations:** Add smooth animations for emoji placement, vanishing, and highlighting the winning line.
*   **Score Tracker:** Implement a score tracking system for multiple rounds.
*   **Sound Effects:** Add sound effects for placing emojis, winning, and other game events.
*   **Advanced AI Opponent:** Develop an AI for single-player mode.
*   **Customizable Board Size/Rules:** Allow users to change game parameters.
*   **Refined UI/UX:** Further polish the visual design and user experience, perhaps with themes.
*   **State Management:** For a larger application, consider more robust state management like Zustand or Redux.
*   **More Sophisticated "Banned Cell" Handling:** Explore if the "banned cell" mechanic needs further refinement for strategic depth.
---

This project was developed using [Lovable.dev](https://lovable.dev). Commit history reflects the iterative development process.
