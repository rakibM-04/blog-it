import { Button } from "neetoui";

export const generateCategoryButtons = ({
  allCategories,
  selectedCategoryIds,
  onFilterChange,
}) =>
  allCategories.map(({ id, name }) => {
    const isSelected = selectedCategoryIds.includes(id);

    const handleToggleCategory = categoryId => {
      if (selectedCategoryIds.includes(categoryId)) {
        return onFilterChange(
          selectedCategoryIds.filter(id => id !== categoryId)
        );
      }

      return onFilterChange([...selectedCategoryIds, categoryId]);
    };

    return (
      <Button
        className={isSelected ? "themed-button" : ""}
        key={id}
        label={name}
        style={isSelected ? "primary" : "tertiary"}
        onClick={() => handleToggleCategory(id)}
      />
    );
  });
