const checkNullObject = (object: Record<any, any>) => {
  let isCheck = Object.keys(object).length === 0;
  return isCheck;
};

export default checkNullObject;
