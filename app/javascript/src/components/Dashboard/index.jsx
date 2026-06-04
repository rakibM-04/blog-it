import { useState } from "react";

import Scaffold from "commons/Scaffold";
import usePostSearch from "hooks/usePostSearch";
import { Filter as FilterIcon } from "neetoicons";
import { Button, Spinner } from "neetoui";
import * as R from "ramda";
import { useTranslation } from "react-i18next";
import routes from "routes";

import FilterForm from "./Form/Filter";
import { createPostEntries } from "./utils";

const Dashboard = () => {
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);

  const { isLoading, posts, updateQueryParams, categories } = usePostSearch();

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const openFilterPane = () => setIsFilterPaneOpen(true);
  const closeFilterPane = () => setIsFilterPaneOpen(false);

  const handleFilterSubmit = async ({ categories }) => {
    const categoryIds = R.pluck("id", categories);
    updateQueryParams({ categoryIds });
    closeFilterPane();
  };

  const ToolbarElements = (
    <>
      <Button icon={FilterIcon} style="secondary" onClick={openFilterPane} />
      <Button
        className="themed-button"
        label={t("blogPosts.addNewPost")}
        to={routes.posts.create}
      />
    </>
  );

  return (
    <>
      <FilterForm
        filters={{ categories }}
        handleSubmit={handleFilterSubmit}
        isOpen={isFilterPaneOpen}
        onClose={closeFilterPane}
      />
      <Scaffold scroll title={t("blogPosts.title")} toolbar={ToolbarElements}>
        {createPostEntries(posts)}
      </Scaffold>
    </>
  );
};

export default Dashboard;
