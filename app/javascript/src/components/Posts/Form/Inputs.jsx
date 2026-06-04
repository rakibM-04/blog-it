import { useFormikContext } from "formik";
import { t } from "i18next";
import { Input, Select, Textarea } from "neetoui/formik";

const Inputs = ({ categories, mode, setMode, actions }) => {
  const { resetForm, submitForm } = useFormikContext();
  const Actions = actions;

  return (
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
      <div className="flex gap-4">
        <Actions {...{ mode, setMode, resetForm, submitForm }} />
      </div>
    </div>
  );
};

export default Inputs;
