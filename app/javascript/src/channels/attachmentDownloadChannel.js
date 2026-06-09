import { t } from "i18next";
import { getFromLocalStorage } from "utils/storage";

export const subscribeToAttachmentDownloadChannel = ({
  consumer,
  setMessage,
  setProgress,
  generatePdf,
}) => {
  const userId = getFromLocalStorage("authUserId");
  const attachmentDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "AttachmentDownloadChannel",
      pubsub_token: userId,
    },
    {
      connected() {
        setMessage(t("posts.attachment.connected"));
        generatePdf();
      },
      received(data) {
        const { message, progress } = data;
        setMessage(message);
        setProgress(progress);
      },
    }
  );

  return attachmentDownloadSubscription;
};
