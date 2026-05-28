import React from "react";

import { useTranslation } from "react-i18next";

const withT = Component => {
  const TComponent = props => {
    const { t } = useTranslation();

    return <Component {...{ t, ...props }} />;
  };

  return TComponent;
};

export default withT;
