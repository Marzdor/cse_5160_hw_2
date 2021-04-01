import { getRndInteger } from "./generateData";

const sumOfArray = (arr) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return arr.reduce(reducer);
};

const getRandomItemsFromArray = (arr) => {
  const arrayLength = arr.length - 1;
  const itemsToGet = getRndInteger(1, arrayLength);
  const items = [];
  const usedIndexes = [];

  if (itemsToGet === arrayLength) {
    return arr;
  } else {
    for (let i = 0; i < itemsToGet; i++) {
      const randomIndex = getRndInteger(0, arrayLength);

      if (!usedIndexes.includes(randomIndex)) {
        usedIndexes.push(randomIndex);
        items.push(arr[randomIndex]);
      }
    }

    return items;
  }
};

export const inRange = (x, min, max) => {
  return (x - min) * (x - max) <= 0;
};

export const getResidualsSum = (data, state) => {
  const { intercept, slope } = state;
  const residuals = { intercept: [], slope: [] };

  const itemsToTest = getRandomItemsFromArray(data);

  itemsToTest.forEach((person) => {
    const predictedHeight = intercept + slope * person.weight;
    const diff = person.height - predictedHeight;
    const derivativeIntercept = -2 * diff;
    const derivativeSlope = -2 * person.weight * diff;

    residuals.intercept.push(derivativeIntercept);
    residuals.slope.push(derivativeSlope);
  });

  return {
    intercept: sumOfArray(residuals.intercept),
    slope: sumOfArray(residuals.slope),
  };
};
