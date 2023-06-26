export const reducerByType = (obj, cb) => {
  return Object.entries(obj).reduce((acc, el) => {
    return typeof el[1] === "string"
      ? cb(acc, el[1])
      : cb(acc + el[0], reducerByType(el[1], cb));
  }, "");
};