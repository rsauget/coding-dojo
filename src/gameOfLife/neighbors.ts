import { Board, Cell } from './models';

function getTopLeftNeighbor({
  board,
  line,
  column,
}: {
  board: Board;
  line: number;
  column: number;
}): Cell | undefined {
  return board[line - 1]?.[column - 1];
}

function getTopNeighbor({
  board,
  line,
  column,
}: {
  board: Board;
  line: number;
  column: number;
}): Cell | undefined {
  return board[line - 1]?.[column];
}

function getTopRightNeighbor({
  board,
  line,
  column,
}: {
  board: Board;
  line: number;
  column: number;
}): Cell | undefined {
  return board[line - 1]?.[column + 1];
}

function getLeftNeighbor({
  board,
  line,
  column,
}: {
  board: Board;
  line: number;
  column: number;
}): Cell | undefined {
  return board[line]?.[column - 1];
}

function getRightNeighbor({
  board,
  line,
  column,
}: {
  board: Board;
  line: number;
  column: number;
}): Cell | undefined {
  return board[line]?.[column + 1];
}

function getBottomLeftNeighbor({
  board,
  line,
  column,
}: {
  board: Board;
  line: number;
  column: number;
}): Cell | undefined {
  return board[line + 1]?.[column - 1];
}

function getBottomNeighbor({
  board,
  line,
  column,
}: {
  board: Board;
  line: number;
  column: number;
}): Cell | undefined {
  return board[line + 1]?.[column];
}

function getBottomRightNeighbor({
  board,
  line,
  column,
}: {
  board: Board;
  line: number;
  column: number;
}): Cell | undefined {
  return board[line + 1]?.[column + 1];
}

export function getCellNeighbors({
  board,
  line,
  column,
}: {
  board: Board;
  line: number;
  column: number;
}): Cell[] {
  return [
    getTopLeftNeighbor({ board, line, column }),
    getTopNeighbor({ board, line, column }),
    getTopRightNeighbor({ board, line, column }),
    getLeftNeighbor({ board, line, column }),
    getRightNeighbor({ board, line, column }),
    getBottomLeftNeighbor({ board, line, column }),
    getBottomNeighbor({ board, line, column }),
    getBottomRightNeighbor({ board, line, column }),
  ].filter((cell) => cell !== undefined) as Cell[];
}
