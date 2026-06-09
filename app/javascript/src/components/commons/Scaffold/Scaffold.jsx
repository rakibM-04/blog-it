import classnames from "classnames";
import { Typography } from "neetoui";

import Sidebar from "./Sidebar";

const Scaffold = ({
  title,
  toolbar,
  children,
  sidebarItems,
  titleBadge,
  scroll = false,
  showSidebar = true,
}) => (
  <div className="flex h-screen w-full">
    {showSidebar && <Sidebar items={sidebarItems} />}
    <div className="flex-1">
      <div className="flex h-full flex-col gap-8 overflow-hidden p-8">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Typography className="text-5xl first-letter:uppercase">
              {title}
            </Typography>
            {titleBadge}
          </div>
          <div className="flex h-fit gap-2">{toolbar}</div>
        </div>
        <div
          className={classnames("flex h-full flex-col gap-4", {
            "overflow-y-scroll": scroll,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default Scaffold;
