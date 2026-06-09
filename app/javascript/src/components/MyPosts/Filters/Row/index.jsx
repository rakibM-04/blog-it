import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Pane, Typography } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import useTableFilterStore from "stores/useTableFilterStore";

import { ROW_FILTER_VALIDATION_SCHEMA } from "./constants";
import Inputs from "./Inputs";

const Filter = ({ isOpen, onClose }) => {
  const { data: { categories = [] } = {}, isLoading } = useFetchCategories();

  const { t } = useTranslation();

  const {
    title,
    categories: initialCategories,
    status,
    setRowFilters,
  } = useTableFilterStore.pick();

  const handleSubmit = async ({ categories, status, title }) => {
    setRowFilters({ categories, status, title });
    onClose();
  };

  return (
    <Pane isOpen={isOpen} size="small" onClose={onClose}>
      <Pane.Header>
        <Typography style="h2">{t("dashboard.filters.title")}</Typography>
      </Pane.Header>
      <NeetoUIForm
        formikProps={{
          onSubmit: handleSubmit,
          initialValues: {
            title,
            categories: initialCategories,
            status,
          },
          validationSchema: ROW_FILTER_VALIDATION_SCHEMA,
        }}
      >
        <Inputs {...{ isLoading, categories }} />
      </NeetoUIForm>
    </Pane>
  );
};

export default Filter;
