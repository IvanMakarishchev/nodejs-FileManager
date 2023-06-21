export const reducerByType = (arr, cb) =>
  arr.reduce(
    (acc, el) =>
      typeof el[1] === "string"
        ? cb(acc, el[1])
        : cb(acc + el[0], reducerByType(Object.entries(el[1]), cb)),
    ""
  );
