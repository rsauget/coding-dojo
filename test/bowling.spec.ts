import { getFrameScore, getLineScore, isSpare, isStrike } from '../src/bowling';

describe('Bowling', () => {
  describe('isStrike', () => {
    it('a strike is when all 10 pins are down on first throw', () => {
      expect(isStrike([10])).to.be.true;
      expect(isStrike([5, 5])).to.be.false;
      expect(isStrike([3, 5])).to.be.false;
    });
  });

  describe('isSpare', () => {
    it('a spare is when all the 10 pins are down in two throws', () => {
      expect(isSpare([5, 5])).to.be.true;
      expect(isSpare([4, 5])).to.be.false;
    });

    it('a strike is not a spare', () => {
      expect(isSpare([10])).to.be.false;
    });
  });

  describe('getFrameScore', () => {
    it('score is the sum of the two throws', () => {
      expect(getFrameScore([1, 2], [])).to.equal(3);
      expect(getFrameScore([4, 4], [])).to.equal(8);
    });

    it('a spare adds the next throw to the current frame score', () => {
      expect(getFrameScore([5, 5], [[1, 2]])).to.equal(11);
    });

    it('a strike adds the next two throws to the current frame score', () => {
      expect(getFrameScore([10], [[1, 2]])).to.equal(13);
    });
  });

  describe('getLineScore', () => {
    it('line score is the sum of all frames scores', () => {
      expect(
        getLineScore([
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
        ]),
      ).to.equal(50);
      expect(
        getLineScore([
          [10],
          [3, 4],
          [1, 2],
          [5, 5],
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
        ]),
      ).to.equal(68);
      expect(
        getLineScore([
          [9, 0],
          [9, 0],
          [9, 0],
          [9, 0],
          [9, 0],
          [9, 0],
          [9, 0],
          [9, 0],
          [9, 0],
          [9, 0],
        ]),
      ).to.equal(90);
    });

    it('if last frame is a spare, a final throw is made to calculate last frame score', () => {
      expect(
        getLineScore([
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 7, 1],
        ]),
      ).to.equal(54);
      expect(
        getLineScore([
          [5, 5],
          [5, 5],
          [5, 5],
          [5, 5],
          [5, 5],
          [5, 5],
          [5, 5],
          [5, 5],
          [5, 5],
          [5, 5, 5],
        ]),
      ).to.equal(150);
    });

    it('if last frame is a strike, two final throws are made to calculate last frame score', () => {
      expect(
        getLineScore([
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [10, 1, 2],
        ]),
      ).to.equal(56);
      expect(
        getLineScore([
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [10, 5, 5],
        ]),
      ).to.equal(63);
      expect(
        getLineScore([
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [3, 4],
          [1, 2],
          [10, 10, 10],
        ]),
      ).to.equal(73);
      expect(
        getLineScore([[10], [10], [10], [10], [10], [10], [10], [10], [10], [10, 10, 10]]),
      ).to.equal(300);
    });
  });
});
