# frozen_string_literal: true

class ChangeDefaultOfUserPostCount < ActiveRecord::Migration[8.0]
  def change
    change_column_default :users, :posts_count, 0
  end
end
