import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import Scaffold from "commons/Scaffold/Scaffold";
import {
  useDeletePost,
  useShowPost,
  useUpdatePost,
} from "hooks/reactQuery/usePostsApi";
import { Spinner } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import routes from "routes";

import Form from "./Form";
import { MODES } from "./Form/constants";
import EditActions from "./Form/EditActions";

const Edit = () => {
  const [mode, setMode] = useState(MODES.publish);

  const updateMutation = useUpdatePost();
  const deleteMutation = useDeletePost();

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
    if (mode === MODES.delete) {
      deleteMutation.mutate(slug, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["posts", slug] });
          history.replace(routes.home);
        },
      });
    } else {
      const categoryIds = categories?.map(category => category.id) ?? [];
      updateMutation.mutate(
        { slug, title, description, categoryIds },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts", slug] });
            history.push(routes.home);
          },
        }
      );
    }
  };

  return (
    <Scaffold title={t("posts.edit")}>
      <Form
        actions={EditActions}
        {...{ mode, setMode, handleSubmit }}
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
