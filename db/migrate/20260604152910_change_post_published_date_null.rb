# frozen_string_literal: true

class ChangePostPublishedDateNull < ActiveRecord::Migration[8.0]
  def change
    change_column_default :posts, :published_at, nil
    change_column_null :posts, :published_at, true
  end
end
