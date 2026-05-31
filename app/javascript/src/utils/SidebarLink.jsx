import { Tooltip } from "neetoui";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ route, icon, name, isActive }) => (
  <Tooltip content={name}>
    <NavLink
      activeClassName="bg-gray-200"
      className="rounded-md p-1"
      isActive={isActive}
      to={route}
    >
      {icon}
    </NavLink>
  </Tooltip>
);

export default SidebarLink;
