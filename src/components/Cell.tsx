
import React from "react";
import { EmojiCell } from "@/types";

interface CellProps {
  value: EmojiCell | null;
  onClick: () => void;
  disabled?: boolean;
  isWinningCell?: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, disabled, isWinningCell }) => {
  return (
    <button
      className={`w-20 h-20 md:w-24 md:h-24 border-2 border-slate-400 flex items-center justify-center text-4xl md:text-5xl rounded-md shadow-sm
        ${disabled ? "bg-slate-200 cursor-not-allowed" : "bg-white hover:bg-slate-50 cursor-pointer"}
        ${isWinningCell ? (value?.player === "P1" ? "bg-orange-300" : "bg-sky-300") : ""}
        transition-all duration-150 ease-in-out
      `}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Cell ${value ? `contains ${value.emoji} from Player ${value.player}` : 'empty'}`}
    >
      {value?.emoji}
    </button>
  );
};

export default Cell;
