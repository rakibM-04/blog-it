import organizationsApi from "apis/organizations";
import { useQuery } from "reactquery";

export const useFetchOrganizations = () =>
  useQuery({
    queryKey: ["organizations"],
    queryFn: () => organizationsApi.fetch(),
    staleTime: 0,
    cacheTime: 0,
  });
