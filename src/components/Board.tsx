
import React from "react";
import Cell from "./Cell";
import { BoardState, EmojiCell } from "@/types";

interface BoardProps {
  board: BoardState;
  onCellClick: (index: number) => void;
  disabledCells?: number[]; // Cells that cannot be clicked (e.g., vanished cell)
  winningCombination?: number[] | null;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, disabledCells = [], winningCombination }) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-2 bg-slate-200 rounded-lg shadow-md">
      {board.map((cellValue, index) => (
        <Cell
          key={index}
          value={cellValue}
          onClick={() => onCellClick(index)}
          disabled={!!cellValue || disabledCells.includes(index)}
          isWinningCell={winningCombination?.includes(index)}
        />
      ))}
    </div>
  );
};

export default Board;
