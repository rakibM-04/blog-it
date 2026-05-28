import React from "react";

import { t } from "i18next";
import { Helmet } from "react-helmet";

const withTitle = (Component, title) => {
  const ComponentWithTitle = props => {
    const pageTitle = title
      ? t(`pageTitle`, { title: t(`titles.${title.toLowerCase()}`) })
      : t("title");

    return (
      <>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <Component {...props} />
      </>
    );
  };

  return ComponentWithTitle;
};

export default withTitle;
