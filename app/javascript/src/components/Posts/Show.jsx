import Scaffold from "commons/Scaffold";
import { createCategoryTags } from "components/Dashboard/utils";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { t } from "i18next";
import { Edit } from "neetoicons";
import { Avatar, Button, Spinner, Typography } from "neetoui";
import { useParams } from "react-router-dom";
import routes from "routes";
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

  const categoryNames = categories.map(({ name }) => name);

  return (
    <Scaffold
      title={title}
      toolbar={
        <Button
          icon={Edit}
          label={t("posts.edit")}
          style="secondary"
          to={routes.posts.edit.replace(":slug", slug)}
        />
      }
    >
      <div className="relative bottom-4 flex flex-col border-b-2 pb-4">
        <div className="flex">{createCategoryTags(categoryNames)}</div>
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
      <Typography className="overflow-scroll whitespace-pre text-wrap">
        {description}
      </Typography>
    </Scaffold>
  );
};

export default Show;
