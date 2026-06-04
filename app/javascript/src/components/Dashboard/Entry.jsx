import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { formatDate } from "utils/date";
import { buildUrl } from "utils/url";

import { createCategoryTags } from "./utils";

const Entry = ({ title, published_at, slug, categories, author }) => (
  <div className="flex flex-col items-start gap-1 border-b-2 border-slate-200 py-4">
    <Link to={buildUrl(routes.posts.show, { slug })}>
      <Typography className="capitalize hover:cursor-pointer" style="h1">
        {title}
      </Typography>
    </Link>
    <div className="flex">{createCategoryTags(categories)}</div>
    <Typography className="mt-2">{author}</Typography>
    <Typography className="text-gray-400" style="h5">
      {formatDate(published_at)}
    </Typography>
  </div>
);

export default Entry;
