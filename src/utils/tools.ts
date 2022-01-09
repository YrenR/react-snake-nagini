export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const isEmpty = (arr: Array<any>): boolean => arr.length === 0;
