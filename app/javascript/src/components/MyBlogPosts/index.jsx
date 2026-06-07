import { useState } from "react";

import Scaffold from "commons/Scaffold/Scaffold";
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
import { generateRowData } from "./utils";

const MyBlogPosts = () => {
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
  ).concat(COLUMN_ACTIONS);

  return (
    <>
      <RowFiltersPane
        isOpen={isFilterPaneOpen}
        onClose={() => setIsFilterPaneOpen(false)}
      />
      <Scaffold
        isLoading={isLoading}
        title={t("myBlogPosts.title")}
        sidebarItems={
          <Button
            icon={Filter}
            style="text"
            onClick={() => setIsFilterPaneOpen(true)}
          />
        }
        toolbar={
          selectedRowKeys.length === 0 ? (
            <ColumnFilters />
          ) : (
            <Bulk selectedSlugs={selectedRowKeys} />
          )
        }
      >
        <Typography style="h3">
          {t("myBlogPosts.articleCount", { count: posts.length })}
        </Typography>
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
