import { Form as NeetoUIForm } from "@bigbinary/neetoui/formik";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Spinner } from "neetoui";

import { FORM_DEFAULT_VALUES, FORM_VALIDATION_SCHEMA } from "./constants";
import Inputs from "./Inputs";

const Create = ({ handleSubmit }) => {
  const { data: { categories } = {}, isLoading } = useFetchCategories();

  if (isLoading) return <Spinner />;

  return (
    <NeetoUIForm
      className="mt-12 flex h-full w-full flex-col"
      formikProps={{
        onSubmit: handleSubmit,
        initialValues: FORM_DEFAULT_VALUES,
        validationSchema: FORM_VALIDATION_SCHEMA,
      }}
    >
      <Inputs categories={categories} />
    </NeetoUIForm>
  );
};

export default Create;
