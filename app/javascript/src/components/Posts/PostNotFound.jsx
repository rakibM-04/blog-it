import { NoData } from "neetoui";
import routes from "routes";
import withT from "utils/withT";

const PostNotFound = ({ t }) => (
  <div className="flex h-screen items-center justify-center">
    <NoData
      title={t("posts.notFound.title")}
      primaryButtonProps={{
        label: t("pageNotFound.buttonLabel"),
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: routes.home,
      }}
    />
  </div>
);

export default withT(PostNotFound);
