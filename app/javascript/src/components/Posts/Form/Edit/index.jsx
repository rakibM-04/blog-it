import Scaffold from "commons/Scaffold/Scaffold";
import { t } from "i18next";
import { Input, Select, Textarea } from "neetoui/formik";

import EditActions from "./Actions";

const EditInputs = ({
  categories,
  mode,
  setMode,
  handlePreview,
  handleDelete,
}) => (
  <Scaffold
    title={t("posts.edit")}
    toolbar={
      <EditActions {...{ mode, setMode, handlePreview, handleDelete }} />
    }
  >
    <div className="flex w-full flex-col gap-4">
      <Input label={t("posts.form.title")} name="title" />
      <Textarea label={t("posts.form.description")} name="description" />
      <Select
        isMulti
        label={t("posts.form.categories")}
        name="categories"
        optionRemapping={{ label: "name", value: "id" }}
        options={categories}
      />
    </div>
  </Scaffold>
);

export default EditInputs;
