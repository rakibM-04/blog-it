# frozen_string_literal: true

class AddUniqueIndexToVotes < ActiveRecord::Migration[8.0]
  def change
    add_index :votes, [:user_id, :post_id], unique: true
  end
end
