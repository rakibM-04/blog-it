import Scaffold from "commons/Scaffold/Scaffold";
import { MODES } from "components/constants";
import { useFormikContext } from "formik";
import { t } from "i18next";
import { ActionDropdown } from "neetoui";
import { Button, Input, Select, Textarea } from "neetoui/formik";

const CreateInputs = ({ categories, mode, setMode }) => {
  const { resetForm, submitForm } = useFormikContext();

  return (
    <Scaffold title={t("posts.create")}>
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
            buttonProps={{ className: "themed-button" }}
            className="themed-button self-start"
            dropdownProps={{ buttonProps: { className: "themed-button" } }}
            label={t(`posts.form.${mode}`)}
            type="submit"
            onClick={() => submitForm()}
          >
            <ActionDropdown.Menu>
              <ActionDropdown.MenuItem.Button
                onClick={() => setMode(MODES.published)}
              >
                {t("posts.form.published")}
              </ActionDropdown.MenuItem.Button>
              <ActionDropdown.MenuItem.Button
                onClick={() => setMode(MODES.draft)}
              >
                {t("posts.form.draft")}
              </ActionDropdown.MenuItem.Button>
            </ActionDropdown.Menu>
          </ActionDropdown>
        </div>
      </div>
    </Scaffold>
  );
};

export default CreateInputs;
