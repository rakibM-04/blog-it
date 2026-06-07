import { useState } from "react";

import Scaffold from "commons/Scaffold/Scaffold";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import { t } from "i18next";
import { Filter } from "neetoicons";
import { Button, Table, Typography } from "neetoui";
import * as R from "ramda";
import useTableFilterStore from "stores/useTableFilterStore";

import { COLUMN_ACTIONS, COLUMN_DATA } from "./constants";
import ColumnFilters from "./Filters/Column";
import RowFiltersPane from "./Filters/Row";
import { generateRowData } from "./utils";

const MyBlogPosts = () => {
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);
  const {
    categories: selectedCategories,
    title,
    status: selectedStatus,
    allowedColumns,
  } = useTableFilterStore.pick();

  const categories = selectedCategories.map(category => category.id);
  const status = selectedStatus.value;

  const { isLoading, data: { posts = [] } = {} } = useFetchPosts(
    R.filter(Boolean, {
      personal: true,
      categories,
      title,
      status,
    })
  );

  const rowData = generateRowData(posts);
  const filteredColumnData = COLUMN_DATA.filter(
    column => allowedColumns[column.key]
  );
  filteredColumnData.push(COLUMN_ACTIONS);

  return (
    <>
      <RowFiltersPane
        isOpen={isFilterPaneOpen}
        onClose={() => setIsFilterPaneOpen(false)}
      />
      <Scaffold
        isLoading={isLoading}
        title={t("myBlogPosts.title")}
        toolbar={<ColumnFilters />}
        sidebarItems={
          <Button
            icon={Filter}
            style="text"
            onClick={() => setIsFilterPaneOpen(true)}
          />
        }
      >
        <Typography style="h3">
          {t("myBlogPosts.articleCount", { count: posts.length })}
        </Typography>
        <Table scroll columnData={filteredColumnData} rowData={rowData} />
      </Scaffold>
    </>
  );
};

export default MyBlogPosts;
