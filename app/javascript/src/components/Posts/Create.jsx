import { useState } from "react";

import Scaffold from "commons/Scaffold";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

import { MODES } from "./Form/constants";
import CreateForm from "./Form/Create";

const Create = () => {
  const mutation = useCreatePost();
  const history = useHistory();
  const { t } = useTranslation();

  const [mode, setMode] = useState(MODES.publish);

  const handleSubmit = async ({ title, description, categories }) => {
    const categoryIds = categories.map(category => category.id);
    mutation.mutate(
      { title, description, categoryIds, status: mode },
      {
        onSuccess: () => {
          history.push(routes.home);
        },
      }
    );
  };

  return (
    <Scaffold title={t("posts.create")}>
      <CreateForm {...{ mode, setMode, handleSubmit }} />
    </Scaffold>
  );
};

export default Create;
