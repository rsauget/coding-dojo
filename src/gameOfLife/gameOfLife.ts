import { ALIVE, Board, Cell, DEAD } from './models';
import { getCellNeighbors } from './neighbors';

function getAliveCellNextGeneration({ livingNeighborsCount }: { livingNeighborsCount: number }): {
  cell: Cell;
} {
  const neighborhoodIsLifeFriendly = [2, 3].includes(livingNeighborsCount);
  if (neighborhoodIsLifeFriendly) {
    return { cell: ALIVE };
  }

  return { cell: DEAD };
}

function getDeadCellNextGeneration({ livingNeighborsCount }: { livingNeighborsCount: number }): {
  cell: Cell;
} {
  const neighborhoodIsLifeFriendly = livingNeighborsCount === 3;
  if (neighborhoodIsLifeFriendly) {
    return { cell: ALIVE };
  }

  return { cell: DEAD };
}

export function getCellNextGeneration({ cell, neighbors }: { cell: Cell; neighbors: Cell[] }): {
  cell: Cell;
} {
  const livingNeighborsCount = neighbors.filter((neighbor) => neighbor === ALIVE).length;

  const cellIsAlive = cell === ALIVE;
  if (cellIsAlive) {
    return getAliveCellNextGeneration({ livingNeighborsCount });
  }

  return getDeadCellNextGeneration({ livingNeighborsCount });
}

export function getBoardNextGeneration({ board }: { board: Board }) {
  const boardNexGeneration = board.map((cellLine, line) =>
    cellLine.map((cell, column) => {
      const neighbors = getCellNeighbors({ board, line, column });
      const { cell: cellNextGeneration } = getCellNextGeneration({ cell, neighbors });
      return cellNextGeneration;
    }),
  );
  return { board: boardNexGeneration };
}
