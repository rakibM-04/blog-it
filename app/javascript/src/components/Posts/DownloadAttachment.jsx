import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { subscribeToAttachmentDownloadChannel } from "channels/attachmentDownloadChannel";
import createConsumer from "channels/consumer";
import { ProgressBar } from "commons";
import FileSaver from "file-saver";
import { t } from "i18next";
import { Modal } from "neetoui";
import { useParams } from "react-router-dom";

const DownloadAttachment = ({ isOpen, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const { slug } = useParams();

  const downloadPdf = async () => {
    const data = await postsApi.download(slug);
    FileSaver.saveAs(data, `${slug}.pdf`);
  };

  useEffect(
    () => {
      const consumer = createConsumer();

      const generatePdf = async () => {
        await postsApi.generatePdf(slug);
      };

      subscribeToAttachmentDownloadChannel({
        consumer,
        setMessage,
        setProgress,
        generatePdf,
      });

      return () => {
        consumer.disconnect();
      };
    },
    // There is only a need to subscribe once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (progress === 100) {
      setMessage(t("posts.attachment.ready"));
      downloadPdf();

      setTimeout(() => onClose(), 2000);
    }
    // We only need to trigger the download once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <Modal className="p-8" {...{ isOpen, onClose }}>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">{message}</p>
        {progress < 100 && <ProgressBar progress={progress} />}
      </div>
    </Modal>
  );
};

export default DownloadAttachment;
