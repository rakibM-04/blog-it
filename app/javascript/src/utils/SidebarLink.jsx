import React from "react";

import { Tooltip } from "@bigbinary/neetoui";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ route, icon, name }) => (
  <Tooltip content={name}>
    <NavLink
      exact
      activeClassName="bg-gray-200"
      className="rounded-md p-1"
      to={route}
    >
      {icon}
    </NavLink>
  </Tooltip>
);

export default SidebarLink;
