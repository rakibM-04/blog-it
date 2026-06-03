import Scaffold from "commons/Scaffold";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

import CreateForm from "./Form/Create";

const Create = () => {
  const mutation = useCreatePost();
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = async ({ title, description, categories }) => {
    const categoryIds = categories.map(category => category.id);
    mutation.mutate(
      { title, description, categoryIds },
      {
        onSuccess: () => {
          history.push(routes.home);
        },
      }
    );
  };

  return (
    <Scaffold title={t("posts.create")}>
      <CreateForm handleSubmit={handleSubmit} />
    </Scaffold>
  );
};

export default Create;
