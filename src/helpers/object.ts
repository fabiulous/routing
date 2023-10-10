export const cleanObject = (obj: Record<any, any>) => {
  return Object.keys(obj).reduce<Record<string, any>>((newObj, key) => {
    if(![null, undefined, ''].includes(obj[key])) {
      newObj[key] = obj[key];
    }
    return newObj;
  }, {});
};
