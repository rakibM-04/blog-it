# frozen_string_literal: true

class RemoveIndexFromCategory < ActiveRecord::Migration[8.0]
  def change
    remove_index :categories, :post_id
  end
end
