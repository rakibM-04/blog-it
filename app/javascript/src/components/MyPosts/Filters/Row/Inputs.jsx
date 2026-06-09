import { useFormikContext } from "formik";
import { t } from "i18next";
import { Pane, Spinner } from "neetoui";
import { Input, Select, Button } from "neetoui/formik";

import { STATUS_OPTIONS } from "./constants";

const Inputs = ({ categories, isLoading }) => {
  const { resetForm } = useFormikContext();

  return (
    <>
      <Pane.Body className="flex w-full flex-col items-stretch">
        {isLoading ? (
          <Spinner className="h-full" />
        ) : (
          <div className="flex flex-col gap-4">
            <Input label={t("myBlogPosts.filters.title")} name="title" />
            <Select
              isMulti
              label={t("myBlogPosts.filters.category")}
              name="categories"
              optionRemapping={{ label: "name", value: "id" }}
              options={categories}
            />
            <Select
              label={t("myBlogPosts.filters.status.label")}
              name="status"
              options={STATUS_OPTIONS}
            />
          </div>
        )}
      </Pane.Body>
      <Pane.Footer className="gap-4">
        <Button
          className="themed-button"
          label={t("myBlogPosts.filters.submit")}
          type="submit"
        />
        <Button
          disabled={false}
          label={t("myBlogPosts.filters.reset")}
          style="secondary"
          type="reset"
          onClick={resetForm}
        />
      </Pane.Footer>
    </>
  );
};

export default Inputs;
