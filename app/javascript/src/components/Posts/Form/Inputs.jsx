import { useFormikContext } from "formik";
import { t } from "i18next";
import { ActionDropdown } from "neetoui";
import { Button, Input, Select, Textarea } from "neetoui/formik";

import { MODES } from "./constants";

const Inputs = ({ categories, mode, setMode }) => {
  const { resetForm, submitForm } = useFormikContext();

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
        <ActionDropdown
          className="themed-button self-start"
          label={t(`posts.form.${mode}`)}
          type="submit"
          onClick={() => submitForm()}
        >
          <ActionDropdown.Menu>
            <ActionDropdown.MenuItem.Button
              onClick={() => setMode(MODES.publish)}
            >
              {t("posts.form.published")}
            </ActionDropdown.MenuItem.Button>
            <ActionDropdown.MenuItem.Button
              onClick={() => setMode(MODES.draft)}
            >
              {t("posts.form.drafted")}
            </ActionDropdown.MenuItem.Button>
          </ActionDropdown.Menu>
        </ActionDropdown>
      </div>
    </div>
  );
};

export default Inputs;
