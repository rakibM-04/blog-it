import { useState } from "react";

import Scaffold from "commons/Scaffold/Scaffold";
import {
  FORM_INITIAL_VALUES,
  FORM_VALIDATION_SCHEMA,
  STATUS,
} from "components/Posts/constants";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import { t } from "i18next";
import { Spinner } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import { useHistory } from "react-router-dom";
import routes from "routes";

import Inputs from "./Inputs";

const Create = () => {
  const mutation = useCreatePost();
  const history = useHistory();

  const [mode, setMode] = useState(STATUS.published);

  const { data: { categories } = {}, isLoading } = useFetchCategories();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const handleSubmit = async ({ title, description, categories }) => {
    const categoryIds = categories.map(category => category.id);
    mutation.mutate(
      { title, description, categoryIds, status: mode },
      {
        onSuccess: () => {
          history.push(routes.home);
        },
      }
    );
  };

  return (
    <NeetoUIForm
      className="h-full w-full"
      formikProps={{
        onSubmit: handleSubmit,
        initialValues: FORM_INITIAL_VALUES,
        validationSchema: FORM_VALIDATION_SCHEMA,
      }}
    >
      <Scaffold title={t("posts.create")}>
        <div className="flex w-full flex-col gap-4">
          <Inputs {...{ categories, mode, setMode }} />
        </div>
      </Scaffold>
    </NeetoUIForm>
  );
};

export default Create;
