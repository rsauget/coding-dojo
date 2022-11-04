export const DEAD = 0;
export const ALIVE = 1;
export type Cell = typeof DEAD | typeof ALIVE;
export type Board = Cell[][];
