import { useQuery } from "@tanstack/react-query";
import categoriesApi from "apis/categories";

export const useFetchCategories = () =>
  useQuery({
    queryFn: () => categoriesApi.fetch(),
  });
