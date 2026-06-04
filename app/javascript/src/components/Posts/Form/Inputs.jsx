import { useFormikContext } from "formik";
import { t } from "i18next";
import { Button, Input, Select, Textarea } from "neetoui/formik";

const Inputs = ({ categories }) => {
  const { resetForm } = useFormikContext();

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
        <Button
          className="self-start"
          label={t("posts.form.reset")}
          style="tertiary"
          type="reset"
          onClick={resetForm}
        />
        <Button
          className="themed-button self-start"
          label={t("posts.form.submit")}
          type="submit"
        />
      </div>
    </div>
  );
};

export default Inputs;
