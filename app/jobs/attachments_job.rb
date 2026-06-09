# frozen_string_literal: true

class AttachmentsJob
  include Sidekiq::Job

  def perform(user_id, slug, attachment_path)
    ActionCable.server.broadcast(user_id, { message: I18n.t("attachment.render"), progress: 25 })
    logger.log(user_id, slug, attachment_path)
    post = Post.find_by(slug:)
    content = ApplicationController.render(
      assigns: { post:, user: post.user },
      template: "posts/attachment/download",
      layout: "pdf"
    )

    ActionCable.server.broadcast(user_id, { message: I18n.t("attachment.generate"), progress: 50 })
    pdf_blob = WickedPdf.new.pdf_from_string(content)

    ActionCable.server.broadcast(user_id, { message: I18n.t("attachment.upload"), progress: 75 })
    File.open(attachment_path, "wb") do |f|
      f.write(pdf_blob)
    end

    ActionCable.server.broadcast(user_id, { message: I18n.t("attachment.attach"), progress: 100 })
  end
end
