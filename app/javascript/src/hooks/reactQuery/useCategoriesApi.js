import categoriesApi from "apis/categories";
import { useQuery } from "reactquery";

export const useFetchCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.fetch(),
  });
