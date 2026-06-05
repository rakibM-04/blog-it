import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Pane, Typography, Button, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";

const Filter = ({ isOpen, onClose, filters, handleSubmit }) => {
  const { data: { categories: allCategories = [] } = {}, isLoading } =
    useFetchCategories();
  const { t } = useTranslation();

  const { categories = [] } = filters;
  const selectedCategories = categories.map(Number);
  const categoryButtons = allCategories.map(({ id, name }) =>
    selectedCategories.includes(id) ? (
      <Button
        className="themed-button"
        key={`${id}-selected`}
        label={name}
        onClick={() =>
          handleSubmit(selectedCategories.filter(value => value !== id))
        }
      />
    ) : (
      <Button
        key={`${id}-unselected`}
        label={name}
        style="tertiary"
        onClick={() => handleSubmit([...new Set([...selectedCategories, id])])}
      />
    )
  );

  return (
    <Pane isOpen={isOpen} size="small" onClose={onClose}>
      <Pane.Header>
        <Typography style="h2">{t("blogPosts.filters.title")}</Typography>
      </Pane.Header>
      <Pane.Body className="flex w-full flex-col items-stretch gap-2">
        {isLoading ? <Spinner /> : categoryButtons}
      </Pane.Body>
    </Pane>
  );
};

export default Filter;
