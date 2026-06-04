import { t } from "i18next";
import { ActionDropdown } from "neetoui";
import { Button } from "neetoui/formik";

import { MODES } from "./constants";

const CreateActions = ({ mode, setMode, resetForm, submitForm }) => (
  <>
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
        <ActionDropdown.MenuItem.Button onClick={() => setMode(MODES.publish)}>
          {t("posts.form.published")}
        </ActionDropdown.MenuItem.Button>
        <ActionDropdown.MenuItem.Button onClick={() => setMode(MODES.draft)}>
          {t("posts.form.drafted")}
        </ActionDropdown.MenuItem.Button>
      </ActionDropdown.Menu>
    </ActionDropdown>
  </>
);

export default CreateActions;
