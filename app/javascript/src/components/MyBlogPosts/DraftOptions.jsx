import { useQueryClient } from "@tanstack/react-query";
import { useDeletePost, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import { MenuHorizontal } from "neetoicons";
import { Dropdown } from "neetoui";

const DraftOptions = ({ slug }) => {
  const deleteMutation = useDeletePost();
  const updateMutation = useUpdatePost();
  const queryClient = useQueryClient();

  const deleteHandler = () => {
    deleteMutation.mutate(
      { slug, quiet: true },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKeys: ["posts"] }),
      }
    );
  };

  const updateHandler = () => {
    updateMutation.mutate(
      { slug, quiet: true, status: "published" },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKeys: ["posts"] }),
      }
    );
  };

  return (
    <Dropdown
      buttonProps={{ style: "text" }}
      icon={MenuHorizontal}
      strategy="fixed"
    >
      <Dropdown.Menu>
        <Dropdown.MenuItem.Button className="p-2" onClick={updateHandler}>
          Publish
        </Dropdown.MenuItem.Button>
        <Dropdown.Divider />
        <Dropdown.MenuItem.Button
          className="p-2"
          style="danger"
          onClick={deleteHandler}
        >
          Delete
        </Dropdown.MenuItem.Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DraftOptions;
