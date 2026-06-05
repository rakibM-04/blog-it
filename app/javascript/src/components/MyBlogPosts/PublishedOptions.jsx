import { MODES } from "components/constants";
import { useDeletePost, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import { t } from "i18next";
import { MenuHorizontal } from "neetoicons";
import { Dropdown } from "neetoui";

const PublishedOptions = ({ slug }) => {
  const deleteMutation = useDeletePost(slug);
  const updateMutation = useUpdatePost(slug);

  const deleteHandler = () => {
    deleteMutation.mutate({ quiet: true });
  };

  const updateHandler = () => {
    updateMutation.mutate({ quiet: true, status: MODES.draft });
  };

  return (
    <Dropdown
      buttonProps={{ style: "text" }}
      icon={MenuHorizontal}
      strategy="fixed"
    >
      <Dropdown.Menu>
        <Dropdown.MenuItem.Button className="p-2" onClick={updateHandler}>
          {t("posts.form.unpublish")}
        </Dropdown.MenuItem.Button>
        <Dropdown.Divider />
        <Dropdown.MenuItem.Button
          className="p-2"
          style="danger"
          onClick={deleteHandler}
        >
          {t("posts.form.delete")}
        </Dropdown.MenuItem.Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PublishedOptions;
