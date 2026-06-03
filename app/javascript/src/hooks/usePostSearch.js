import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { useFetchPosts } from "./reactQuery/usePostsApi";
import useQueryParams from "./useQueryParams";

const usePostSearch = () => {
  const { categories } = useQueryParams();
  const history = useHistory();
  const { data: { posts } = {}, isLoading } = useFetchPosts(categories);

  const updateQueryParams = ({ categoryIds }) => {
    history.replace(buildUrl(routes.home, { categories: categoryIds }));
  };

  return {
    isLoading,
    posts,
    updateQueryParams,
    categories,
  };
};

export default usePostSearch;
