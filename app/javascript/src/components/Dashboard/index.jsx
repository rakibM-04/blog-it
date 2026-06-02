import { useState } from "react";

import usePostSearch from "hooks/usePostSearch";
import { Filter as FilterIcon } from "neetoicons";
import { Typography, Button, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";
import routes from "routes";

import Filter from "./Filter";
import { createPostEntries } from "./utils";

const BlogPosts = () => {
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
    const categoryIds = categories.map(category => category.id);
    updateQueryParams({ categories: categoryIds });
    closeFilterPane();
  };

  return (
    <>
      <Filter
        filters={{ categories }}
        handleSubmit={handleFilterSubmit}
        isOpen={isFilterPaneOpen}
        onClose={closeFilterPane}
      />
      <div className="flex h-full flex-col gap-8 overflow-hidden p-8">
        <div className="flex w-full items-center justify-between">
          <Typography className="text-5xl">{t("blogPosts.title")}</Typography>
          <div className="flex h-fit gap-2">
            <Button
              icon={FilterIcon}
              style="secondary"
              onClick={openFilterPane}
            />
            <Button
              className="themed-button"
              label={t("blogPosts.addNewPost")}
              to={routes.posts.create}
            />
          </div>
        </div>
        <div className="flex h-full flex-col gap-4 overflow-y-scroll">
          {createPostEntries(posts)}
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
