import classnames from "classnames";
import { Typography } from "neetoui";

const Scaffold = ({ title, toolbar, children, scroll = false }) => (
  <div className="flex h-full flex-col gap-8 overflow-hidden p-8">
    <div className="flex w-full items-center justify-between">
      <Typography className="text-5xl">{title}</Typography>
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
);

export default Scaffold;
