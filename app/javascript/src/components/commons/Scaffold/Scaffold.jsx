import classnames from "classnames";
import Sidebar from "commons/Scaffold/Sidebar";
import { Spinner, Typography } from "neetoui";

const Scaffold = ({
  title,
  toolbar,
  children,
  sidebarItems,
  titleBadge,
  scroll = false,
  showSidebar = true,
  isLoading = false,
}) => (
  <div className="flex h-screen w-full">
    {showSidebar && <Sidebar items={sidebarItems} />}
    <div className="flex-1">
      <div className="flex h-full flex-col gap-8 overflow-hidden p-8">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Typography className="text-5xl capitalize">{title}</Typography>
            {titleBadge}
          </div>
          <div className="flex h-fit gap-2">{toolbar}</div>
        </div>
        <div
          className={classnames("flex h-full flex-col gap-4", {
            "overflow-y-scroll": scroll,
          })}
        >
          {isLoading ? (
            <div className="h-full">
              <Spinner />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Scaffold;
