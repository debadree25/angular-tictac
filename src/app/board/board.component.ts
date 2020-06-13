import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: string[];
  player: 'X' | 'O';
  winner: string;
  nMoves = 0;
  constructor() {
    this.beginGame();
  }

  ngOnInit(): void {
  }

  beginGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.player = 'X';
    this.nMoves = 0;
  }

  get currentPlayer() {
    return this.player;
  }

  move(ind: number) {
    if (this.winner) {
      return;
    }
    if (!this.squares[ind]) {
      this.squares[ind] = this.currentPlayer;
      this.player = (this.player === 'X') ? 'O' : 'X';
      this.nMoves += 1;
    }
    this.winner = this.getWinner();
    if (this.nMoves === 9 && !this.winner) {
      this.winner = 'Draw';
    }
  }

  getWinner(): string {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
