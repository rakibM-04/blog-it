import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Pane, Typography, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";

import { generateCategoryButtons } from "./utils";

const Filter = ({ isOpen, onClose, filters, onFilterChange }) => {
  const { data: { categories: allCategories = [] } = {}, isLoading } =
    useFetchCategories();
  const { t } = useTranslation();

  const selectedCategoryIds = (filters.categories || []).map(Number);

  return (
    <Pane isOpen={isOpen} size="small" onClose={onClose}>
      <Pane.Header>
        <Typography style="h2">{t("dashboard.filters.title")}</Typography>
      </Pane.Header>
      <Pane.Body className="flex w-full flex-col items-stretch gap-2 overflow-y-scroll">
        {isLoading ? (
          <Spinner className="h-full" />
        ) : (
          generateCategoryButtons({
            allCategories,
            selectedCategoryIds,
            onFilterChange,
          })
        )}
      </Pane.Body>
    </Pane>
  );
};

export default Filter;
