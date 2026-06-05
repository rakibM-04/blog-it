# frozen_string_literal: true

class AddPostsCountToUser < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :posts_count, :integer
  end
end
