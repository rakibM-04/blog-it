import { t } from "i18next";
import { Spinner as NeetoUISpinner, Typography } from "neetoui";

import Sidebar from "./Sidebar";

const Spinner = ({ title, sidebarItems, showSidebar = true }) => (
  <div className="flex h-screen w-full">
    {showSidebar && <Sidebar items={sidebarItems} />}
    <div className="flex-1">
      <div className="flex h-full flex-col gap-8 overflow-hidden p-8">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Typography className="text-5xl first-letter:uppercase">
              {title ?? t("loading")}
            </Typography>
          </div>
        </div>
        <div className="flex h-full flex-col gap-4">
          <NeetoUISpinner />
        </div>
      </div>
    </div>
  </div>
);

export default Spinner;
