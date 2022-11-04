import { getBoardNextGeneration, getCellNextGeneration } from '../src/gameOfLife/gameOfLife';
import { ALIVE, DEAD } from '../src/gameOfLife/models';
import { getCellNeighbors } from '../src/gameOfLife/neighbors';

describe('Game of Life', () => {
  describe('getCellNextGeneration', () => {
    it('a dead cell with 3 living neighbors revives', () => {
      expect(
        getCellNextGeneration({
          cell: DEAD,
          neighbors: [ALIVE, ALIVE, ALIVE],
        }),
      ).to.deep.equal({
        cell: ALIVE,
      });
      expect(
        getCellNextGeneration({
          cell: DEAD,
          neighbors: [ALIVE, DEAD, DEAD],
        }),
      ).to.deep.equal({
        cell: DEAD,
      });
      expect(
        getCellNextGeneration({
          cell: DEAD,
          neighbors: [ALIVE, ALIVE, DEAD],
        }),
      ).to.deep.equal({
        cell: DEAD,
      });
      expect(
        getCellNextGeneration({
          cell: DEAD,
          neighbors: [ALIVE, ALIVE, ALIVE, ALIVE],
        }),
      ).to.deep.equal({
        cell: DEAD,
      });
    });

    it('a living cell with 0 or 1 living neighbors dies', () => {
      expect(
        getCellNextGeneration({
          cell: ALIVE,
          neighbors: [DEAD, DEAD, DEAD],
        }),
      ).to.deep.equal({
        cell: DEAD,
      });
      expect(
        getCellNextGeneration({
          cell: ALIVE,
          neighbors: [ALIVE, DEAD, DEAD],
        }),
      ).to.deep.equal({
        cell: DEAD,
      });
    });

    it('a living cell with 2 or 3 living neighbors survives', () => {
      expect(
        getCellNextGeneration({
          cell: ALIVE,
          neighbors: [ALIVE, ALIVE, DEAD],
        }),
      ).to.deep.equal({
        cell: ALIVE,
      });
      expect(
        getCellNextGeneration({
          cell: ALIVE,
          neighbors: [ALIVE, ALIVE, ALIVE],
        }),
      ).to.deep.equal({
        cell: ALIVE,
      });
    });

    it('a living cell with more than 3 living neighbors dies', () => {
      expect(
        getCellNextGeneration({
          cell: ALIVE,
          neighbors: [ALIVE, ALIVE, ALIVE, ALIVE],
        }),
      ).to.deep.equal({
        cell: DEAD,
      });
    });
  });

  describe('getCellNeighbors', () => {
    it('a corner cell has 5 neighbors', () => {
      expect(
        getCellNeighbors({
          board: [
            [ALIVE, DEAD, ALIVE],
            [ALIVE, ALIVE, DEAD],
            [DEAD, DEAD, DEAD],
          ],
          line: 0,
          column: 0,
        }),
      ).to.deep.equal([DEAD, ALIVE, ALIVE]);
      expect(
        getCellNeighbors({
          board: [
            [DEAD, DEAD, ALIVE],
            [ALIVE, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
          ],
          line: 0,
          column: 2,
        }),
      ).to.deep.equal([DEAD, ALIVE, DEAD]);
    });

    it('a border cell has 5 neighbors', () => {
      expect(
        getCellNeighbors({
          board: [
            [ALIVE, DEAD, ALIVE],
            [ALIVE, ALIVE, DEAD],
            [DEAD, DEAD, DEAD],
          ],
          line: 0,
          column: 1,
        }),
      ).to.deep.equal([ALIVE, ALIVE, ALIVE, ALIVE, DEAD]);
      expect(
        getCellNeighbors({
          board: [
            [DEAD, DEAD, ALIVE],
            [ALIVE, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
          ],
          line: 1,
          column: 0,
        }),
      ).to.deep.equal([DEAD, DEAD, ALIVE, DEAD, ALIVE]);
    });

    it('a regular cell has 8 neighbors', () => {
      expect(
        getCellNeighbors({
          board: [
            [ALIVE, DEAD, ALIVE],
            [ALIVE, ALIVE, DEAD],
            [DEAD, DEAD, DEAD],
          ],
          line: 1,
          column: 1,
        }),
      ).to.deep.equal([ALIVE, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, DEAD]);
      expect(
        getCellNeighbors({
          board: [
            [DEAD, DEAD, ALIVE],
            [ALIVE, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
          ],
          line: 1,
          column: 1,
        }),
      ).to.deep.equal([DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, ALIVE, DEAD]);
    });
  });

  describe('getBoardNextGeneration', () => {
    it('a dead cell surrounded by 3 living cells revives', () => {
      expect(
        getBoardNextGeneration({
          board: [
            [DEAD, ALIVE],
            [ALIVE, ALIVE],
          ],
        }),
      ).to.deep.equal({
        board: [
          [ALIVE, ALIVE],
          [ALIVE, ALIVE],
        ],
      });
    });

    it('a living cell surrounded by 0 or 1 living cells dies', () => {
      expect(
        getBoardNextGeneration({
          board: [
            [DEAD, DEAD],
            [ALIVE, DEAD],
          ],
        }),
      ).to.deep.equal({
        board: [
          [DEAD, DEAD],
          [DEAD, DEAD],
        ],
      });
      expect(
        getBoardNextGeneration({
          board: [
            [DEAD, DEAD],
            [ALIVE, ALIVE],
          ],
        }),
      ).to.deep.equal({
        board: [
          [DEAD, DEAD],
          [DEAD, DEAD],
        ],
      });
    });

    it('a living cell surrounded by 2 or 3 living cells survives', () => {
      expect(
        getBoardNextGeneration({
          board: [
            [DEAD, ALIVE],
            [ALIVE, ALIVE],
          ],
        }),
      ).to.deep.equal({
        board: [
          [ALIVE, ALIVE],
          [ALIVE, ALIVE],
        ],
      });
      expect(
        getBoardNextGeneration({
          board: [
            [ALIVE, ALIVE],
            [ALIVE, ALIVE],
          ],
        }),
      ).to.deep.equal({
        board: [
          [ALIVE, ALIVE],
          [ALIVE, ALIVE],
        ],
      });
    });

    it('a living cell surrounded by more than 3 living cells dies', () => {
      expect(
        getBoardNextGeneration({
          board: [
            [DEAD, ALIVE, ALIVE],
            [ALIVE, ALIVE, ALIVE],
            [DEAD, DEAD, DEAD],
          ],
        }),
      ).to.deep.equal({
        board: [
          [ALIVE, DEAD, ALIVE],
          [ALIVE, DEAD, ALIVE],
          [DEAD, ALIVE, DEAD],
        ],
      });
    });
  });
});
