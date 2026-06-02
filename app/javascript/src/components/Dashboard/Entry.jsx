import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { formatDate } from "utils/date";
import { buildUrl } from "utils/url";

import { createCategoryTags } from "./utils";

const Entry = ({ title, created_at, slug, categories, author }) => (
  <div className="flex flex-col items-start gap-1 rounded-md border-2 border-slate-200 px-2 py-4">
    <Link to={buildUrl(routes.posts.show, { slug })}>
      <Typography className="font-bold hover:cursor-pointer" style="h1">
        {title}
      </Typography>
    </Link>
    <div className="flex gap-2">{createCategoryTags(categories)}</div>
    <Typography className="mt-4">{author}</Typography>
    <Typography className="text-gray-400" style="h5">
      {formatDate(created_at)}
    </Typography>
  </div>
);

export default Entry;
