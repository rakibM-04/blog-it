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

const Create = ({ handleSubmit }) => {
  const { t } = useTranslation();
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
      <div className="flex w-full flex-col gap-4">
        <Input label={t("posts.form.title")} name="title" />
        <Textarea label={t("posts.form.description")} name="description" />
        <Select
          isMulti
          label={t("posts.form.categories")}
          name="categories"
          optionRemapping={{ label: "name", value: "id" }}
          options={categories}
        />
        <div className="flex gap-4">
          <Button
            className="self-start"
            label={t("posts.form.reset")}
            style="tertiary"
            type="reset"
          />
          <Button
            className="themed-button self-start"
            label={t("posts.form.submit")}
            type="submit"
          />
        </div>
      </div>
    </NeetoUIForm>
  );
};

export default Create;
