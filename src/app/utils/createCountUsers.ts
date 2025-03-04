export const createNumberArray = (count:number) => {
    const numberArray = [];
    for (let i = 1; i <= count; i++) {
      numberArray.push(i);
    }
    return numberArray;
  };