import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { MODES } from "components/constants";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import {
  useDeletePost,
  useShowPost,
  useUpdatePost,
} from "hooks/reactQuery/usePostsApi";
import { Spinner } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import { useHistory, useParams } from "react-router-dom";
import routes from "routes";

import { FORM_VALIDATION_SCHEMA } from "./Form/constants";
import EditForm from "./Form/Edit";

const Edit = () => {
  const [mode, setMode] = useState(MODES.published);

  const updateMutation = useUpdatePost();
  const deleteMutation = useDeletePost();

  const history = useHistory();
  const queryClient = useQueryClient();

  const { slug } = useParams();
  const {
    isLoadingPost,
    data: { post: { title, description, categories } = {} } = {},
  } = useShowPost({ slug });

  const { isLoadingCategories, data: { categories: categoryOptions } = {} } =
    useFetchCategories();

  if (isLoadingPost || isLoadingCategories) return <Spinner />;

  const handleDelete = () => {
    deleteMutation.mutate(
      { slug },
      {
        onSuccess: () => {
          history.replace(routes.home);
        },
      }
    );
  };

  const handleSubmit = async ({ title, description, categories }) => {
    const categoryIds = categories?.map(category => category.id) ?? [];

    updateMutation.mutate(
      { slug, title, description, categoryIds, status: mode },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["posts", slug] });
          history.push(routes.home);
        },
      }
    );
  };

  const handlePreview = ({ title, description, categories }) => {
    const categoryIds = categories?.map(category => category.id) ?? [];
    updateMutation.mutate(
      { slug, status: "draft", title, description, categoryIds, quiet: true },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["posts", slug] });
          history.push(routes.posts.show.replace(":slug", slug));
        },
      }
    );
  };

  return (
    <NeetoUIForm
      className="h-full w-full"
      formikProps={{
        onSubmit: handleSubmit,
        initialValues: { title, description, categories },
        validationSchema: FORM_VALIDATION_SCHEMA,
      }}
    >
      <EditForm
        {...{
          mode,
          setMode,
          handleSubmit,
          handleDelete,
          handlePreview,
          categories: categoryOptions,
        }}
      />
    </NeetoUIForm>
  );
};

export default Edit;
