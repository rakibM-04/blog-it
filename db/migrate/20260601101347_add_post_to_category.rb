# frozen_string_literal: true

class AddPostToCategory < ActiveRecord::Migration[8.0]
  def change
    add_reference :categories, :post, null: false, foreign_key: true
  end
end
