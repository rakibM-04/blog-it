import { STATUS } from "constants";

import { useState } from "react";

import {
  useDeleteBulkPosts,
  useUpdateBulkPosts,
} from "hooks/reactQuery/useMyPostsApi";
import { t } from "i18next";
import { MenuHorizontal } from "neetoicons";
import { ActionDropdown, Button } from "neetoui";

const Bulk = ({ selectedSlugs }) => {
  const [status, setStatus] = useState(STATUS.published);
  const updateBulkMutation = useUpdateBulkPosts();
  const deleteBulkMutation = useDeleteBulkPosts();

  const handleUpdateSubmit = () => {
    updateBulkMutation.mutate({ slugs: selectedSlugs, status });
  };

  const handleDeleteSubmit = () => {
    deleteBulkMutation.mutate(selectedSlugs);
  };

  return (
    <>
      <ActionDropdown
        buttonProps={{ style: "secondary" }}
        icon={MenuHorizontal}
        label={t(`posts.form.${status}`)}
        strategy="fixed"
        onClick={handleUpdateSubmit}
      >
        <ActionDropdown.Menu>
          <ActionDropdown.MenuItem.Button
            className="p-2"
            onClick={() => setStatus(STATUS.published)}
          >
            {t("posts.form.publish")}
          </ActionDropdown.MenuItem.Button>
          <ActionDropdown.Divider />
          <ActionDropdown.MenuItem.Button
            className="p-2"
            onClick={() => setStatus(STATUS.draft)}
          >
            {t("posts.form.draft")}
          </ActionDropdown.MenuItem.Button>
        </ActionDropdown.Menu>
      </ActionDropdown>
      <Button
        className="text-red-700"
        label={t("posts.form.delete")}
        style="tertiary"
        onClick={handleDeleteSubmit}
      />
    </>
  );
};

export default Bulk;
