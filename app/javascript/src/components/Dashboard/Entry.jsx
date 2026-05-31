import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { formatDate } from "utils/date";
import { buildUrl } from "utils/url";

const Post = ({ title, description, created_at, slug }) => (
  <div className="flex flex-col items-start gap-1 rounded-md border-2 border-slate-200 px-2 py-4">
    <Link to={buildUrl(routes.posts.show, { slug })}>
      <Typography className="font-bold hover:cursor-pointer" style="h3">
        {title}
      </Typography>
    </Link>
    <Typography className="line-clamp-2">
      {description.slice(0, 100)}
    </Typography>
    <Typography className="text-gray-400" style="h5">
      {formatDate(created_at)}
    </Typography>
  </div>
);

export default Post;
