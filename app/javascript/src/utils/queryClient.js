import { QueryClient, QueryCache } from "reactquery";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // onError: () => (window.location.href = routes.home),
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 3_600_000,
    },
  },
});

export default queryClient;
