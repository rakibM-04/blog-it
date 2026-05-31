import { Typography } from "neetoui";

import { formatDate } from "./utils";

const Post = ({ title, description, created_at }) => (
  <div className="flex flex-col items-start gap-1 rounded-md border-2 border-slate-200 px-2 py-4">
    <Typography className="font-bold" style="h3">
      {title}
    </Typography>
    <Typography>{description}</Typography>
    <Typography className="text-gray-400" style="h5">
      {formatDate(created_at)}
    </Typography>
  </div>
);

export default Post;
