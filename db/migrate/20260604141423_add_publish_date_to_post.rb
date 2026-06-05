# frozen_string_literal: true

class AddPublishDateToPost < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :published_at, :datetime, default: Time.current, null: false
  end
end
