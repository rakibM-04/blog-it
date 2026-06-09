import { COLUMN_KEYS } from "constants";

import { t } from "i18next";
import { ActionDropdown, Checkbox } from "neetoui";
import useFilterStore from "stores/useTableFilterStore";

const ColumnFilter = () => {
  const { allowedColumns, toggleColumn } = useFilterStore();

  const makeFilterOptions = () =>
    Object.values(COLUMN_KEYS).map(columnKey => (
      <ActionDropdown.MenuItem.Button key={columnKey}>
        <Checkbox
          checked={allowedColumns[columnKey]}
          disabled={columnKey === COLUMN_KEYS.title}
          label={t(`myBlogPosts.columnData.${columnKey}`)}
          onClick={() => toggleColumn(columnKey)}
        />
      </ActionDropdown.MenuItem.Button>
    ));

  return (
    <ActionDropdown
      buttonStyle="tertiary"
      className="themed-button self-start"
      label={t("myBlogPosts.columnFilterTitle")}
      type="submit"
    >
      <ActionDropdown.Menu>{makeFilterOptions()}</ActionDropdown.Menu>
    </ActionDropdown>
  );
};

export default ColumnFilter;
