import { useState } from "react";

import Scaffold from "commons/Scaffold/Scaffold";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

import Form from "./Form";
import { MODES } from "./Form/constants";
import CreateActions from "./Form/CreateActions";

const Create = () => {
  const mutation = useCreatePost();
  const history = useHistory();
  const { t } = useTranslation();

  const [mode, setMode] = useState(MODES.publish);

  const handleSubmit = async ({ title, description, categories }) => {
    const categoryIds = categories?.map(category => category.id) ?? [];
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
      <Form {...{ mode, setMode, handleSubmit }} actions={CreateActions} />
    </Scaffold>
  );
};

export default Create;
