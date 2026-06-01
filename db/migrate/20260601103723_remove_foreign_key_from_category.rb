# frozen_string_literal: true

class RemoveForeignKeyFromCategory < ActiveRecord::Migration[8.0]
  def change
    remove_foreign_key :categories, :posts
  end
end
