import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { Spinner, Typography } from "neetoui";
import { useParams } from "react-router-dom";
import { formatDate } from "utils/date";

const Show = () => {
  const { slug } = useParams();
  const {
    isLoading,
    data: { post: { title, description, created_at } = {} } = {},
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
      <div>
        <Typography className="bold text-4xl">{title}</Typography>
        <Typography className="text-gray-400">
          {formatDate(created_at)}
        </Typography>
      </div>
      <Typography className="overflow-scroll whitespace-pre text-wrap">
        {description}
      </Typography>
    </div>
  );
};

export default Show;
