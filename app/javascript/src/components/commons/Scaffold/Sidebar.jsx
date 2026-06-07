import { resetAuthTokens } from "apis/axios";
import { t } from "i18next";
import { Book, Edit, Folder } from "neetoicons";
import { Avatar, Dropdown, Typography } from "neetoui";
import routes from "routes";

import SidebarLink from "./SidebarLink";

import { getFromLocalStorage, setToLocalStorage } from "../../../utils/storage";
import { matchesAnyPath } from "../../../utils/url";

const Sidebar = ({ items }) => {
  const currentUser = {
    name: getFromLocalStorage("authUserName"),
    email: getFromLocalStorage("authEmail"),
  };

  const handleLogout = () => {
    setToLocalStorage({
      authToken: null,
      email: null,
      userId: null,
      userName: null,
    });
    resetAuthTokens();
    window.location.href = "/";
  };

  return (
    <div className="flex-0 flex h-full flex-col justify-start gap-2 bg-gray-50 px-2 py-10 shadow-lg">
      <SidebarLink
        icon={<Book />}
        name={t("dashboard.title")}
        route={routes.home}
        isActive={(_, location) =>
          matchesAnyPath(location.pathname, [routes.home, routes.posts.show])
        }
      />
      <SidebarLink
        icon={<Edit />}
        name={t("posts.create")}
        route={routes.posts.create}
        isActive={(_, location) =>
          matchesAnyPath(location.pathname, [
            routes.posts.create,
            routes.posts.edit,
          ])
        }
      />
      <SidebarLink
        icon={<Folder />}
        name={t("myBlogPosts.title")}
        route={routes.posts.personal}
      />
      {items}
      <div className="mt-auto">
        <Dropdown
          className="mb-8 ml-4"
          customTarget={<Avatar user={{ name: currentUser.name }} />}
          position="right"
        >
          <div className="flex items-center gap-3 p-4">
            <Avatar
              size="large"
              user={{
                name: currentUser.name,
              }}
            />
            <div>
              <Typography>{currentUser.name}</Typography>
              <Typography className="text-sm text-gray-400">
                {currentUser.email}
              </Typography>
            </div>
          </div>
          <Dropdown.Divider />
          <Dropdown.Menu>
            <Dropdown.MenuItem.Button style="danger" onClick={handleLogout}>
              {t("users.logout")}
            </Dropdown.MenuItem.Button>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;
