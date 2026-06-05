import { useState } from "react";

import {
  FORM_INITIAL_VALUES,
  FORM_VALIDATION_SCHEMA,
  MODES,
} from "components/Posts/constants";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import { Spinner } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import { useHistory } from "react-router-dom";
import routes from "routes";

import CreateInputs from "./Inputs";

const Create = () => {
  const mutation = useCreatePost();
  const history = useHistory();

  const [mode, setMode] = useState(MODES.published);

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
      <CreateInputs {...{ categories, mode, setMode }} />
    </NeetoUIForm>
  );
};

export default Create;
