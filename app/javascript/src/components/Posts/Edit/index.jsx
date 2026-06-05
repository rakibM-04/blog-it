import { useState } from "react";

import { FORM_VALIDATION_SCHEMA, MODES } from "components/Posts/constants";
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

import EditForm from "./Inputs";

const Edit = () => {
  const [mode, setMode] = useState(MODES.published);
  const { slug } = useParams();

  const updateMutation = useUpdatePost(slug);
  const deleteMutation = useDeletePost(slug);

  const history = useHistory();

  const {
    isLoading: isLoadingPost,
    data: { post: { title, description, categories } = {} } = {},
  } = useShowPost({ slug });

  const {
    isLoading: isLoadingCategories,
    data: { categories: categoryOptions } = {},
  } = useFetchCategories();

  if (isLoadingPost || isLoadingCategories) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

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
          history.push(routes.home);
        },
      }
    );
  };

  const handlePreview = ({ title, description, categories }) => {
    const categoryIds = categories?.map(category => category.id) ?? [];
    updateMutation.mutate(
      { status: MODES.draft, title, description, categoryIds, quiet: true },
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
