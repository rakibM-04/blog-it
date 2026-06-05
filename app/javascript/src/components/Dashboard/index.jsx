import { useState } from "react";

import Scaffold from "commons/Scaffold/Scaffold";
import usePostSearch from "hooks/usePostSearch";
import { Filter as FilterIcon } from "neetoicons";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import routes from "routes";

import FilterForm from "./Form/Filter";
import { createPostEntries } from "./utils";

const Dashboard = () => {
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);

  const { posts = [], updateQueryParams, categories = [] } = usePostSearch();

  const { t } = useTranslation();

  const openFilterPane = () => setIsFilterPaneOpen(true);
  const closeFilterPane = () => setIsFilterPaneOpen(false);

  const handleFilterSubmit = async categoryIds => {
    updateQueryParams({ categoryIds });
  };

  return (
    <>
      <FilterForm
        filters={{ categories }}
        handleSubmit={handleFilterSubmit}
        isOpen={isFilterPaneOpen}
        onClose={closeFilterPane}
      />
      <Scaffold
        scroll
        title={t("blogPosts.title")}
        sidebarElements={
          <Button icon={FilterIcon} style="text" onClick={openFilterPane} />
        }
        toolbar={
          <Button
            className="themed-button"
            label={t("blogPosts.addNewPost")}
            to={routes.posts.create}
          />
        }
      >
        {createPostEntries(posts)}
      </Scaffold>
    </>
  );
};

export default Dashboard;
