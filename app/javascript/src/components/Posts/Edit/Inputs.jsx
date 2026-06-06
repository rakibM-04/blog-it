import { t } from "i18next";
import { Input, Select, Textarea } from "neetoui/formik";

const Inputs = ({ categories }) => (
  <>
    <Input label={t("posts.form.title")} name="title" />
    <Textarea label={t("posts.form.description")} name="description" />
    <Select
      isMulti
      label={t("posts.form.categories")}
      name="categories"
      optionRemapping={{ label: "name", value: "id" }}
      options={categories}
    />
  </>
);

export default Inputs;
