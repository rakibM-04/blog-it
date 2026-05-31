import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import { useHistory } from "react-router-dom";
import routes from "routes";

import Form from "./Form";

const Create = () => {
  const mutation = useCreatePost();
  const history = useHistory();

  const handleSubmit = async ({ title, description }) => {
    mutation.mutate(
      { title, description },
      {
        onSuccess: () => {
          history.push(routes.home);
        },
      }
    );
  };

  return <Form handleSubmit={handleSubmit} />;
};

export default Create;
