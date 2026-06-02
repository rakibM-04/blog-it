import { createCategoryTags } from "components/Dashboard/utils";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { Avatar, Spinner, Typography } from "neetoui";
import { useParams } from "react-router-dom";
import { formatDate } from "utils/date";

const Show = () => {
  const { slug } = useParams();
  const {
    isLoading,
    data: {
      post: { title, description, created_at, author, categories } = {},
    } = {},
  } = useShowPost({ slug });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden p-8">
      <div className="flex flex-col gap-2 border-b-2 pb-4">
        <Typography className="bold text-4xl capitalize">{title}</Typography>
        <div className="flex">{createCategoryTags(categories)}</div>
        <div className="mt-4 flex items-center gap-3">
          <Avatar
            size="large"
            user={{
              name: author,
            }}
          />
          <div>
            <Typography>{author}</Typography>
            <Typography className="text-sm text-gray-400">
              {formatDate(created_at)}
            </Typography>
          </div>
        </div>
      </div>
      <Typography className="mt-4 overflow-scroll whitespace-pre text-wrap">
        {description}
      </Typography>
    </div>
  );
};

export default Show;
