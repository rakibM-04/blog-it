import React from "react";

import { NoData } from "@bigbinary/neetoui";
import withT from "utils/withT";

import Logo from "./Logo";

const PageNotFound = ({ t }) => (
  <div className="flex h-screen items-center justify-center">
    <NoData
      image={<Logo />}
      title={t("pageNotFound.title")}
      primaryButtonProps={{
        label: t("pageNotFound.buttonLabel"),
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: "/",
      }}
    />
  </div>
);

export default withT(PageNotFound);
