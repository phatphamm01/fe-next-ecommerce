const bignumber = require("bignumber.js").BigNumber;

export const numberToMoneyVer2 = (num: any) => {
  if (num === 0) {
    return 0;
  }
  if (num) {
    return (((num as number).toFixed(0) + "") as string).replace(
      /(\d)(?=(\d{3})+(?!\d))/g,
      "$1,"
    );
  }
};

const numberToMoney = (num: number & { c?: number }): string => {
  const checkNaN = !num?.c || num === 0;

  return checkNaN ? "" : String(num).replace(/(.)(?=(\d{3})+$)/g, "$1,");
};

export const stringToNumber = (text: string, length?: number): number => {
  if (length && text.length > length) {
    text = text.substring(0, length + 1);
  }

  let numb = text.match(/\d|e/g);
  let numberClear = numb ? numb.join("") : "";
  return bignumber(numberClear);
};

const convertStringToMoney = (value: any) => {
  if (!value) {
    return 0;
  }

  let num = stringToNumber(value);
  return numberToMoney(bignumber(num));
};

export default convertStringToMoney;
