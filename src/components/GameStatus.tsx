
import React from "react";
import { Player } from "@/types";
import { Button } from "@/components/ui/button";

interface GameStatusProps {
  currentPlayer: Player;
  winner: Player | null;
  onPlayAgain: () => void;
  player1Emoji: string;
  player2Emoji: string;
}

const GameStatus: React.FC<GameStatusProps> = ({
  currentPlayer,
  winner,
  onPlayAgain,
  player1Emoji,
  player2Emoji,
}) => {
  let statusMessage;
  if (winner) {
    statusMessage = (
      <span className={winner === "P1" ? "text-orange-500" : "text-sky-500"}>
        Player {winner === "P1" ? `1 (${player1Emoji})` : `2 (${player2Emoji})`} Wins!
      </span>
    );
  } else {
    statusMessage = (
      <span>
        Current Turn: Player {currentPlayer === "P1" ? `1 (${player1Emoji})` : `2 (${player2Emoji})`}
      </span>
    );
  }

  return (
    <div className="my-6 text-center">
      <p className={`text-2xl font-semibold mb-4 ${winner ? (winner === "P1" ? "text-orange-600" : "text-sky-600") : (currentPlayer === "P1" ? "text-orange-500" : "text-sky-500")}`}>
        {statusMessage}
      </p>
      {winner && (
        <Button onClick={onPlayAgain} size="lg" className="bg-green-500 hover:bg-green-600 text-white">
          Play Again
        </Button>
      )}
    </div>
  );
};

export default GameStatus;
