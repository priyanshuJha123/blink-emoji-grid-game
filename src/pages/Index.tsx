
import React, { useState, useEffect, useCallback } from "react";
import Board from "@/components/Board";
import GameStatus from "@/components/GameStatus";
import HelpModal from "@/components/HelpModal";
import { Button } from "@/components/ui/button";
import { BoardState, Player, EmojiCell, PlacedEmoji } from "@/types";
import { EMOJI_CATEGORIES, PLAYER_ONE_CATEGORY_DEFAULT, PLAYER_TWO_CATEGORY_DEFAULT } from "@/constants/emojis";
import { checkWinner, getRandomEmoji, WINNING_COMBINATIONS } from "@/lib/gameLogic";
import { HelpCircle, Settings } from "lucide-react"; // Added Settings for potential future use
import { useToast } from "@/hooks/use-toast";

const initialBoard = (): BoardState => Array(9).fill(null);
const MAX_EMOJIS_PER_PLAYER = 3;

const Index: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(initialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>("P1");
  const [winner, setWinner] = useState<Player | null>(null);
  const [player1Emojis, setPlayer1Emojis] = useState<PlacedEmoji[]>([]);
  const [player2Emojis, setPlayer2Emojis] = useState<PlacedEmoji[]>([]);
  const [currentP1Emoji, setCurrentP1Emoji] = useState<string>("");
  const [currentP2Emoji, setCurrentP2Emoji] = useState<string>("");
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [bannedCellForNextMove, setBannedCellForNextMove] = useState<number | null>(null);
  const [winningCombination, setWinningCombination] = useState<number[] | null>(null);

  const { toast } = useToast();

  // For now, categories are fixed. Later, this can be part of a pre-game setup.
  const player1Category = PLAYER_ONE_CATEGORY_DEFAULT;
  const player2Category = PLAYER_TWO_CATEGORY_DEFAULT;

  const getNewEmojiForPlayer = useCallback((player: Player) => {
    const category = player === "P1" ? player1Category : player2Category;
    return getRandomEmoji(EMOJI_CATEGORIES[category]);
  }, [player1Category, player2Category]);

  useEffect(() => {
    setCurrentP1Emoji(getNewEmojiForPlayer("P1"));
    setCurrentP2Emoji(getNewEmojiForPlayer("P2"));
  }, [getNewEmojiForPlayer]);

  const resetGame = () => {
    setBoard(initialBoard());
    setCurrentPlayer("P1");
    setWinner(null);
    setPlayer1Emojis([]);
    setPlayer2Emojis([]);
    setCurrentP1Emoji(getNewEmojiForPlayer("P1"));
    setCurrentP2Emoji(getNewEmojiForPlayer("P2"));
    setBannedCellForNextMove(null);
    setWinningCombination(null);
    toast({ title: "Game Reset", description: "Board cleared. Player 1's turn!" });
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || bannedCellForNextMove === index) {
      if (bannedCellForNextMove === index) {
        toast({
          title: "Invalid Move",
          description: "This cell is temporarily unavailable because an emoji just vanished from it.",
          variant: "destructive",
        });
      }
      return;
    }

    let newBoard = [...board];
    const currentEmojis = currentPlayer === "P1" ? player1Emojis : player2Emojis;
    const setPlayerEmojis = currentPlayer === "P1" ? setPlayer1Emojis : setPlayer2Emojis;
    let newBannedCell: number | null = null;

    // Vanishing rule
    if (currentEmojis.length >= MAX_EMOJIS_PER_PLAYER) {
      const oldestEmoji = currentEmojis[0];
      newBoard[oldestEmoji.index] = null; // Clear cell on board
      setPlayerEmojis(currentEmojis.slice(1)); // Remove oldest from player's list
      newBannedCell = oldestEmoji.index;
      toast({
        title: "Emoji Vanished!",
        description: `Player ${currentPlayer}'s oldest emoji ${oldestEmoji.emoji} vanished.`,
      });
    }

    // Place new emoji
    const newEmojiToPlace = currentPlayer === "P1" ? currentP1Emoji : currentP2Emoji;
    newBoard[index] = { emoji: newEmojiToPlace, player: currentPlayer };
    setPlayerEmojis((prev) => [
      ...prev,
      { emoji: newEmojiToPlace, player: currentPlayer, index, timestamp: Date.now() },
    ]);

    setBoard(newBoard);
    setBannedCellForNextMove(newBannedCell); // Set banned cell *before* checking winner or switching turns

    const gameWinner = checkWinner(newBoard, currentPlayer);
    if (gameWinner) {
      setWinner(gameWinner);
      // Find and set winning combination
      for (const combination of WINNING_COMBINATIONS) {
          const [a, b, c] = combination;
          if (
            newBoard[a]?.player === gameWinner &&
            newBoard[b]?.player === gameWinner &&
            newBoard[c]?.player === gameWinner
          ) {
            setWinningCombination(combination);
            break;
          }
      }
      toast({
        title: "Game Over!",
        description: `Player ${gameWinner} wins!`,
        variant: "default",
        className: gameWinner === "P1" ? "bg-orange-500 text-white" : "bg-sky-500 text-white",
      });
    } else {
      setCurrentPlayer(currentPlayer === "P1" ? "P2" : "P1");
      if (currentPlayer === "P1") {
        setCurrentP2Emoji(getNewEmojiForPlayer("P2")); // Prepare next emoji for P2
      } else {
        setCurrentP1Emoji(getNewEmojiForPlayer("P1")); // Prepare next emoji for P1
      }
      // Crucially, clear the banned cell for the *next* player's turn
      if (newBannedCell !== null) {
          // We set it above for current player's logic, now clear for next
          // This timeout ensures the current player sees the "banned" state if they try to click again quickly
          // and then it clears for the next player.
          setTimeout(() => setBannedCellForNextMove(null), 0);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 selection:bg-purple-300 selection:text-purple-900">
      <header className="w-full max-w-md mb-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
          Blink Tac Toe
        </h1>
        <Button variant="outline" size="icon" onClick={() => setIsHelpModalOpen(true)} aria-label="Help">
          <HelpCircle className="h-6 w-6 text-slate-600" />
        </Button>
      </header>

      <main className="bg-white p-6 rounded-xl shadow-2xl">
        <GameStatus
          currentPlayer={currentPlayer}
          winner={winner}
          onPlayAgain={resetGame}
          player1Emoji={currentP1Emoji}
          player2Emoji={currentP2Emoji}
        />
        <Board
          board={board}
          onCellClick={handleCellClick}
          disabledCells={bannedCellForNextMove !== null ? [bannedCellForNextMove] : []}
          winningCombination={winningCombination}
        />
      </main>

      <footer className="mt-8 text-center text-slate-600">
        <p>Player 1 (Orange <span className="text-orange-500">{EMOJI_CATEGORIES[player1Category][0]}...</span>) vs Player 2 (Sky <span className="text-sky-500">{EMOJI_CATEGORIES[player2Category][0]}...</span>)</p>
        <p className="text-sm mt-2">Built with Lovable.dev</p>
      </footer>

      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </div>
  );
};

export default Index;
