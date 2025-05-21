
export type Player = "P1" | "P2";

export interface EmojiCell {
  emoji: string;
  player: Player;
}

export type BoardState = (EmojiCell | null)[];

export interface PlacedEmoji {
  emoji: string;
  player: Player;
  index: number; // cell index
  timestamp: number; // for FIFO
}
