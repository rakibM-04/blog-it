import { MODES } from "components/constants";
import { useFormikContext } from "formik";
import { t } from "i18next";
import { Eye, MenuHorizontal } from "neetoicons";
import { ActionDropdown, Button, Dropdown } from "neetoui";
import routes from "routes";

const EditActions = ({ mode, setMode, handlePreview, handleDelete }) => {
  const { submitForm, values } = useFormikContext();

  return (
    <>
      <Button
        icon={Eye}
        style="text"
        tooltipProps={{ content: "Preview" }}
        onClick={() => handlePreview(values)}
      />
      <Button
        className="self-start"
        disabled={false}
        label={t("posts.form.cancel")}
        style="tertiary"
        to={routes.home}
      />
      <ActionDropdown
        buttonProps={{ className: "themed-button" }}
        className="themed-button self-start"
        dropdownProps={{ buttonProps: { className: "themed-button" } }}
        label={t(`posts.form.${mode}`)}
        type="submit"
        onClick={submitForm}
      >
        <ActionDropdown.Menu>
          <ActionDropdown.MenuItem.Button onClick={() => setMode(MODES.draft)}>
            {t("posts.form.published")}
          </ActionDropdown.MenuItem.Button>
          <ActionDropdown.MenuItem.Button onClick={() => setMode(MODES.draft)}>
            {t("posts.form.draft")}
          </ActionDropdown.MenuItem.Button>
        </ActionDropdown.Menu>
      </ActionDropdown>
      <Dropdown
        buttonProps={{
          icon: MenuHorizontal,
          style: "tertiary",
        }}
      >
        <Dropdown.Menu>
          <Dropdown.MenuItem.Button style="danger" onClick={handleDelete}>
            {t("posts.form.delete")}
          </Dropdown.MenuItem.Button>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default EditActions;
