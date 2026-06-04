# frozen_string_literal: true

class ChangeDefaultStatusOfPostToPublish < ActiveRecord::Migration[8.0]
  def change
    change_column_default :posts, :status, "published"
  end
end
