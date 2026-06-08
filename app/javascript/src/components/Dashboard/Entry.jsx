import { useDownvotePost, useUpvotePost } from "hooks/reactQuery/usePostsApi";
import { t } from "i18next";
import { Tag, Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { formatDate } from "utils/date";
import { buildUrl } from "utils/url";

import { createCategoryTags } from "./utils";
import Vote from "./Vote";

const Entry = ({
  title,
  publishedAt,
  slug,
  categories,
  authorName,
  votesCount,
  voteValue,
  isBloggable,
}) => {
  const upvoteMutation = useUpvotePost();
  const downvoteMutation = useDownvotePost();

  const upvoteHandler = () => {
    upvoteMutation.mutate(slug);
  };

  const downvoteHandler = () => {
    downvoteMutation.mutate(slug);
  };

  return (
    <div className="flex items-center justify-between border-b-2 border-slate-200">
      <div className="flex flex-col items-start gap-1  py-4">
        <Link
          className="flex items-center gap-4"
          to={buildUrl(routes.posts.show, { slug })}
        >
          <Typography className="capitalize hover:cursor-pointer" style="h1">
            {title}
          </Typography>
          {isBloggable && <Tag label={t("dashboard.isBloggable")} />}
        </Link>
        <div className="flex">{createCategoryTags(categories)}</div>
        <Typography className="mt-2">{authorName}</Typography>
        <Typography className="text-gray-400" style="h5">
          {formatDate(publishedAt)}
        </Typography>
      </div>
      <Vote
        {...{
          upvoteHandler,
          downvoteHandler,
          votesCount,
          voteValue,
        }}
      />
    </div>
  );
};

export default Entry;
