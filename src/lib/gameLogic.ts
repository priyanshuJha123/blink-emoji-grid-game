
import { BoardState, Player, EmojiCell } from "@/types";

export const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6],          // Diagonals
];

export function checkWinner(board: BoardState, currentPlayer: Player): Player | null {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (
      board[a] &&
      board[a]?.player === currentPlayer &&
      board[b] &&
      board[b]?.player === currentPlayer &&
      board[c] &&
      board[c]?.player === currentPlayer
    ) {
      return currentPlayer;
    }
  }
  return null;
}

export function getRandomEmoji(categoryEmojis: string[]): string {
  return categoryEmojis[Math.floor(Math.random() * categoryEmojis.length)];
}
