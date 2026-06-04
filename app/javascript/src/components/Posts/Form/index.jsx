import { Form as NeetoUIForm } from "@bigbinary/neetoui/formik";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Spinner } from "neetoui";

import { FORM_DEFAULT_VALUES, FORM_VALIDATION_SCHEMA } from "./constants";
import Inputs from "./Inputs";

const Form = ({
  initialValues = FORM_DEFAULT_VALUES,
  handleSubmit,
  mode,
  setMode,
  actions,
}) => {
  const { data: { categories } = {}, isLoading } = useFetchCategories();

  if (isLoading) return <Spinner />;

  return (
    <NeetoUIForm
      className="mt-12 flex h-full w-full flex-col"
      formikProps={{
        onSubmit: handleSubmit,
        initialValues,
        validationSchema: FORM_VALIDATION_SCHEMA,
      }}
    >
      <Inputs {...{ categories, mode, setMode, actions }} />
    </NeetoUIForm>
  );
};

export default Form;
