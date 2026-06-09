import React from "react";

import classNames from "classnames";
import { motion } from "framer-motion";

const ProgressBar = ({ progress }) => (
  <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
    <motion.div
      animate={{ width: `${progress}%` }}
      className="text-2xs flex h-4 animate-pulse items-center justify-center rounded-full bg-black font-medium leading-none"
      initial={{ width: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <span
        className={classNames("flex items-center justify-center text-white", {
          "absolute left-1": progress <= 8,
        })}
      >
        {progress}%
      </span>
    </motion.div>
  </div>
);

export default ProgressBar;
