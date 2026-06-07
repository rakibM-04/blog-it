import {
  TABLE_FILTER_FORM_INITIAL_VALUES,
  TABLE_FILTER_STORE,
} from "constants";

import { COLUMN_KEYS } from "components/MyBlogPosts/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTableFilterStore = create(
  persist(
    set => ({
      allowedColumns: {
        [COLUMN_KEYS.title]: true,
        [COLUMN_KEYS.categories]: true,
        [COLUMN_KEYS.lastPublishedAt]: true,
        [COLUMN_KEYS.status]: true,
      },
      title: TABLE_FILTER_FORM_INITIAL_VALUES.title,
      categories: TABLE_FILTER_FORM_INITIAL_VALUES.categories,
      status: TABLE_FILTER_FORM_INITIAL_VALUES.status,
      toggleColumn: columnKey =>
        set(({ allowedColumns }) => {
          if (columnKey === COLUMN_KEYS.title) return allowedColumns;

          return {
            allowedColumns: {
              ...allowedColumns,
              [columnKey]: !allowedColumns[columnKey],
            },
          };
        }),
      setRowFilters: ({ title, categories, status }) =>
        set(() => ({ title, categories, status })),
    }),
    { name: TABLE_FILTER_STORE }
  )
);

export default useTableFilterStore;
