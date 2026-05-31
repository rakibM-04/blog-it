import { keysToSnakeCase } from "neetocist";
import { stringify } from "qs";
import { isEmpty, toPairs, omit, pipe } from "ramda";
import { matchPath } from "react-router-dom";

export const buildUrl = (route, params) => {
  const placeHolders = [];
  toPairs(params).forEach(([key, value]) => {
    if (route.includes(`:${key}`)) {
      placeHolders.push(key);
      route = route.replace(`:${key}`, encodeURIComponent(value));
    }
  });

  const queryParams = pipe(
    omit(placeHolders),
    keysToSnakeCase,
    stringify
  )(params);

  return isEmpty(queryParams) ? route : `${route}?${queryParams}`;
};

export const matchesAnyPath = (path, patterns) =>
  patterns.some(pattern =>
    matchPath(path, {
      path: pattern,
      exact: true,
      strict: false,
    })
  );
