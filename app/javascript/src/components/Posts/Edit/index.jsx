import { STATUS } from "constants";

import { useState } from "react";

import Scaffold from "commons/Scaffold/Scaffold";
import { FORM_VALIDATION_SCHEMA } from "components/Posts/constants";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import {
  useDeletePost,
  useShowPost,
  useUpdatePost,
} from "hooks/reactQuery/usePostsApi";
import { t } from "i18next";
import { Spinner } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import { useHistory, useParams } from "react-router-dom";
import routes from "routes";

import Actions from "./Actions";
import Inputs from "./Inputs";

const Edit = () => {
  const [mode, setMode] = useState(STATUS.published);
  const { slug } = useParams();

  const updateMutation = useUpdatePost(slug);
  const deleteMutation = useDeletePost(slug);

  const history = useHistory();

  const {
    isError,
    isLoading: isLoadingPost,
    data: { post: { title, description, categories } = {} } = {},
  } = useShowPost({ slug });

  const {
    isLoading: isLoadingCategories,
    data: { categories: categoryOptions } = {},
  } = useFetchCategories();

  if (isLoadingCategories || isLoadingPost) return <Spinner />;

  if (isError) {
    return history.replace(routes.posts.notFound);
  }

  const selectedCategoryOptions =
    categoryOptions?.filter(({ name }) => categories.includes(name)) || [];

  const handleDelete = () => {
    deleteMutation.mutate(
      {},
      { onSuccess: () => history.replace(routes.home) }
    );
  };

  const handleSubmit = async ({ title, description, categories }) => {
    const categoryIds = categories?.map(category => category.id) ?? [];

    updateMutation.mutate(
      { title, description, categoryIds, status: mode },
      {
        onSuccess: () => {
          history.replace(routes.posts.show.replace(":slug", slug));
        },
      }
    );
  };

  const handlePreview = ({ title, description, categories }) => {
    const categoryIds = categories?.map(category => category.id) ?? [];
    updateMutation.mutate(
      { status: STATUS.draft, title, description, categoryIds, quiet: true },
      {
        onSuccess: () => {
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
        initialValues: {
          title,
          description,
          categories: selectedCategoryOptions,
        },
        validationSchema: FORM_VALIDATION_SCHEMA,
      }}
    >
      <Scaffold
        title={t("posts.edit")}
        toolbar={
          <Actions {...{ mode, setMode, handlePreview, handleDelete }} />
        }
      >
        <div className="flex w-full flex-col gap-4">
          <Inputs categories={categoryOptions} />
        </div>
      </Scaffold>
    </NeetoUIForm>
  );
};

export default Edit;
