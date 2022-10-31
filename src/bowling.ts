type Strike = [10];
type Spare =
  | [0, 10]
  | [1, 9]
  | [2, 8]
  | [3, 7]
  | [4, 6]
  | [5, 5]
  | [6, 4]
  | [7, 3]
  | [8, 2]
  | [9, 1];
type BasicFrame = [number, number];
type Frame = Strike | Spare | BasicFrame;
type LastFrame = BasicFrame | [number, number, number];
type Line = [Frame, Frame, Frame, Frame, Frame, Frame, Frame, Frame, Frame, LastFrame];

export function isStrike(frame: Frame): frame is Strike {
  return frame[0] === 10;
}

export function isSpare(frame: Frame): frame is Spare {
  if (isStrike(frame)) return false;
  return frame[0] + frame[1] === 10;
}

function sumThrows(frame: BasicFrame | LastFrame): number {
  return frame.reduce((sum, throwScore) => sum + throwScore, 0);
}

function isLastFrame(
  frame: Frame | LastFrame,
  nextFrames: Array<Frame | LastFrame>,
): frame is LastFrame {
  return nextFrames.length === 0;
}

function getStrikeScore(nextThrows: number[]) {
  if (nextThrows[0] === undefined || nextThrows[1] === undefined) {
    throw new Error('Not enough throws to calculate score');
  }
  return 10 + nextThrows[0] + nextThrows[1];
}

function getSpareScore(nextThrows: number[]) {
  if (nextThrows[0] === undefined) {
    throw new Error('Not enough throws to calculate score');
  }
  return 10 + nextThrows[0];
}

export function getFrameScore(
  frame: Frame | LastFrame,
  nextFrames: Array<Frame | LastFrame>,
): number {
  if (isLastFrame(frame, nextFrames)) {
    return sumThrows(frame);
  }

  const nextThrows = nextFrames.flat();

  if (isStrike(frame)) {
    return getStrikeScore(nextThrows);
  }

  if (isSpare(frame)) {
    return getSpareScore(nextThrows);
  }

  return sumThrows(frame);
}

function getFramesScore(frames: Array<Frame | LastFrame>, scoreAcc: number): number {
  const [frame, ...nextFrames] = frames;

  if (!frame) {
    return scoreAcc;
  }

  const frameScore = getFrameScore(frame, nextFrames);

  return getFramesScore(nextFrames, scoreAcc + frameScore);
}

export function getLineScore(line: Line): number {
  return getFramesScore(line, 0);
}
