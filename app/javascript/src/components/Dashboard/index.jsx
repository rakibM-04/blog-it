import { useState } from "react";

import Scaffold from "commons/Scaffold/Scaffold";
import usePostSearch from "hooks/usePostSearch";
import { Filter as FilterIcon } from "neetoicons";
import { Button, NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import routes from "routes";

import FilterForm from "./Filter";
import { createPostEntries } from "./utils";

const Dashboard = () => {
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);

  const { posts = [], updateQueryParams, categories = [] } = usePostSearch();

  const { t } = useTranslation();

  return (
    <>
      <FilterForm
        filters={{ categories }}
        isOpen={isFilterPaneOpen}
        onClose={() => setIsFilterPaneOpen(false)}
        onFilterChange={async categoryIds => updateQueryParams({ categoryIds })}
      />
      <Scaffold
        scroll
        title={t("dashboard.title")}
        sidebarItems={
          <Button
            icon={FilterIcon}
            style="text"
            onClick={() => setIsFilterPaneOpen(true)}
          />
        }
        toolbar={
          <Button
            className="themed-button"
            label={t("dashboard.addNewPost")}
            to={routes.posts.create}
          />
        }
      >
        {isEmpty(posts) ? (
          <NoData
            className="h-full"
            description={t("dashboard.noData.description")}
            title={t("dashboard.noData.title")}
          />
        ) : (
          createPostEntries(posts)
        )}
      </Scaffold>
    </>
  );
};

export default Dashboard;
