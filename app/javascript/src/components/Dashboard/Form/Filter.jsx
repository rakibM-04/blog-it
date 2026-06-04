import { Button, Form as NeetoUIForm, Select } from "@bigbinary/neetoui/formik";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Pane, Spinner, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import { FORM_INITIAL_VALUES, FORM_VALIDATION_SCHEMA } from "./constants";

const Filter = ({ isOpen, onClose, filters, handleSubmit }) => {
  const { data: { categories } = {}, isLoading } = useFetchCategories();
  const { t } = useTranslation();

  const { categories: initialCategoriesIds } = filters;

  const initialCategories = initialCategoriesIds
    ? categories.filter(category =>
        initialCategoriesIds.includes(category.id.toString())
      )
    : [];

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Pane isOpen={isOpen} size="small" onClose={onClose}>
      <Pane.Header>
        <Typography style="h2">{t("blogPosts.filters.title")}</Typography>
      </Pane.Header>
      <NeetoUIForm
        className="flex w-full flex-col justify-start"
        formikProps={{
          onSubmit: handleSubmit,
          initialValues: {
            ...FORM_INITIAL_VALUES,
            categories: initialCategories,
          },
          validationSchema: FORM_VALIDATION_SCHEMA,
        }}
      >
        <Pane.Body className="flex w-full flex-col items-stretch gap-2">
          <Select
            isMulti
            label={t("posts.form.categories")}
            name="categories"
            optionRemapping={{ label: "name", value: "id" }}
            options={categories}
          />
        </Pane.Body>
        <Pane.Footer className="flex gap-4">
          <Button
            className="themed-button"
            label={t("blogPosts.filters.submit")}
            type="submit"
          />
          <Button
            disabled={false}
            label={t("blogPosts.filters.cancel")}
            style="secondary"
            onClick={onClose}
          />
        </Pane.Footer>
      </NeetoUIForm>
    </Pane>
  );
};

export default Filter;
