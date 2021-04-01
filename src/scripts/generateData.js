export const createRandomPeople = (howMany) => {
  let people = [];

  for (let i = 0; i < howMany; i++) {
    const height = getRndInteger(146, 213); // in cm
    const weight = getRndInteger(45, 181); // in kilograms

    people.push({ height: height, weight: weight });
  }

  return people;
};

export const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
