import { keysToSnakeCase } from "neetocist";
import { stringify } from "qs";
import * as R from "ramda";
import { matchPath } from "react-router-dom";

export const buildUrl = (route, params) => {
  const placeHolders = [];
  R.toPairs(params).forEach(([key, value]) => {
    if (route.includes(`:${key}`)) {
      placeHolders.push(key);
      route = route.replace(`:${key}`, encodeURIComponent(value));
    }
  });

  const queryParams = R.pipe(
    R.omit(placeHolders),
    keysToSnakeCase,
    stringify
  )(params);

  return R.isEmpty(queryParams) ? route : `${route}?${queryParams}`;
};

export const matchesAnyPath = (path, patterns) =>
  patterns.some(pattern =>
    matchPath(path, {
      path: pattern,
      exact: true,
      strict: false,
    })
  );
