import { useQueryClient } from "@tanstack/react-query";
import Scaffold from "commons/Scaffold";
import { useShowPost, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import { Spinner } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import routes from "routes";

import CreateForm from "./Form/Create";

const Edit = () => {
  const mutation = useUpdatePost();
  const history = useHistory();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { slug } = useParams();
  const {
    isLoading,
    data: { post: { title, description, categories } = {} } = {},
  } = useShowPost({ slug });

  if (isLoading) return <Spinner />;

  const handleSubmit = async ({ title, description, categories }) => {
    const categoryIds = categories.map(category => category.id);
    mutation.mutate(
      { slug, title, description, categoryIds },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["posts", "show", slug] });
          history.push(routes.home);
        },
      }
    );
  };

  return (
    <Scaffold title={t("posts.edit")}>
      <CreateForm
        handleSubmit={handleSubmit}
        initialValues={{
          title,
          description,
          categories,
        }}
      />
    </Scaffold>
  );
};

export default Edit;
