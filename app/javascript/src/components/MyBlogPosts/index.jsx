import { useState } from "react";

import { Scaffold, ScaffoldSpinner } from "commons";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import { t } from "i18next";
import { Filter } from "neetoicons";
import { Button, Table, Typography } from "neetoui";
import * as R from "ramda";
import useTableFilterStore from "stores/useTableFilterStore";

import Bulk from "./Actions/Bulk";
import { COLUMN_ACTIONS, COLUMN_DATA } from "./constants";
import ColumnFilters from "./Filters/Column";
import RowFiltersPane from "./Filters/Row";
import {
  createCategoryTags,
  generateRowData,
  resolveCountMessage,
} from "./utils";

const MyBlogPosts = () => {
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const {
    categories: selectedCategories = [],
    title: selectedTitle,
    status: selectedStatus,
    allowedColumns,
    setRowFilters,
  } = useTableFilterStore.pick();

  const { isLoading, data: { posts = [], totalCount } = {} } = useFetchPosts(
    R.filter(Boolean, {
      personal: true,
      categories: selectedCategories.map(category => category.id),
      title: selectedTitle,
      status: selectedStatus.value,
    })
  );

  if (isLoading) return <ScaffoldSpinner title={t("myBlogPosts.title")} />;

  const rowData = generateRowData(posts);
  const filteredColumnData = COLUMN_DATA.filter(
    column => allowedColumns[column.key]
  ).concat(COLUMN_ACTIONS);

  const handleRemoveCategory = category => {
    setRowFilters({
      categories: selectedCategories.filter(({ name }) => name !== category),
      status: selectedStatus,
      title: selectedTitle,
    });
  };

  const message = resolveCountMessage({
    totalCount,
    title: selectedTitle,
    filteredCount: posts.length,
  });

  const isAnyRowSelected = selectedRowKeys.length > 0;

  return (
    <>
      <RowFiltersPane
        isOpen={isFilterPaneOpen}
        onClose={() => setIsFilterPaneOpen(false)}
      />
      <Scaffold
        title={t("myBlogPosts.title")}
        sidebarItems={
          <Button
            icon={Filter}
            style="text"
            onClick={() => setIsFilterPaneOpen(true)}
          />
        }
        toolbar={
          isAnyRowSelected ? (
            <Bulk selectedSlugs={selectedRowKeys} />
          ) : (
            <ColumnFilters />
          )
        }
      >
        <div className="flex gap-4">
          <Typography style="h3">{message}</Typography>
          <div className="flex gap-1">
            {createCategoryTags({
              categories: R.pluck("name", selectedCategories),
              onClose: handleRemoveCategory,
            })}
          </div>
        </div>
        <Table
          scroll
          bordered={false}
          columnData={filteredColumnData}
          rowData={rowData}
          rowSelection={{ fixed: true }}
          selectedRowKeys={selectedRowKeys}
          onRowSelect={selectedRowKeys => {
            setSelectedRowKeys(selectedRowKeys);
          }}
        />
      </Scaffold>
    </>
  );
};

export default MyBlogPosts;
