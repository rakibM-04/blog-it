# frozen_string_literal: true

class RemoveColumnPostIdFromCategory < ActiveRecord::Migration[8.0]
  def change
    remove_column :categories, :post_id, :string
  end
end
