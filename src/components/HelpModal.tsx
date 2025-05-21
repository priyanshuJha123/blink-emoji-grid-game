
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white p-6 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">How to Play Blink Tac Toe</DialogTitle>
          <DialogDescription className="text-slate-600 mt-2">
            A fun twist on Tic Tac Toe!
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-3 text-slate-700">
          <p><strong>Objective:</strong> Be the first to get 3 of your emojis in a row (horizontally, vertically, or diagonally).</p>
          <p><strong>Emoji Categories:</strong> Each player is assigned an emoji category (e.g., Animals, Food). On your turn, you'll place a random emoji from your category.</p>
          <p><strong>Vanishing Rule:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>You can only have **3 of your emojis** on the board at any time.</li>
            <li>If you place a 4th emoji, your **oldest emoji will disappear** (FIFO - First In, First Out).</li>
            <li>The cell where your oldest emoji vanished **cannot be used for your current turn**, but becomes available again on subsequent turns.</li>
          </ul>
          <p><strong>Winning:</strong> The first player to align 3 of their own emojis wins. The game continues until there's a winner (no draws!).</p>
        </div>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onClose} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Got it!
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HelpModal;
