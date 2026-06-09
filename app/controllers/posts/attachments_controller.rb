# frozen_string_literal: true

class Posts::AttachmentsController < ApplicationController
  def create
    AttachmentsJob.perform_async(current_user.id, params[:slug], attachment_path)
  end

  def download
    if File.exist?(attachment_path)
      send_file(
        attachment_path,
        type: "application/pdf",
        filename: pdf_file_name,
        disposition: "attachment"
      )
    else
      render_error(t("not_found", entity: "attachment"), :not_found)
    end
  end

  private

    def attachment_path
      @_attachment_path ||= Rails.root.join("tmp/#{pdf_file_name}").to_s
    end

    def pdf_file_name
      "blog_it_post.pdf"
    end
end
