import {
  Form as NeetoUIForm,
  Input,
  Textarea,
  Button,
  Select,
} from "@bigbinary/neetoui/formik";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Spinner } from "neetoui";
import { useTranslation } from "react-i18next";

import { FORM_DEFAULT_VALUES, FORM_VALIDATION_SCHEMA } from "./constants";

const Form = ({ handleSubmit }) => {
  const { t } = useTranslation();
  const { data: { categories } = {}, isLoading } = useFetchCategories();

  if (isLoading) return <Spinner />;

  return (
    <NeetoUIForm
      className="flex h-full w-full flex-col justify-between p-12"
      formikProps={{
        onSubmit: handleSubmit,
        initialValues: FORM_DEFAULT_VALUES,
        validationSchema: FORM_VALIDATION_SCHEMA,
      }}
    >
      <div className="flex w-full flex-col gap-4 self-end">
        <Input label={t("posts.form.title")} name="title" />
        <Textarea label={t("posts.form.description")} name="description" />
        <Select
          isMulti
          label={t("posts.form.category")}
          name="categories"
          optionRemapping={{ label: "name", value: "id" }}
          options={categories}
        />
      </div>
      <div className="flex gap-4 self-end">
        <Button
          className="self-start"
          label={t("posts.form.cancel")}
          style="tertiary"
        />
        <Button
          className="themed-button self-start"
          label={t("posts.form.submit")}
          type="submit"
        />
      </div>
    </NeetoUIForm>
  );
};

export default Form;
