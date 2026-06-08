# frozen_string_literal: true

class AddPostRefToVotes < ActiveRecord::Migration[8.0]
  def change
    add_reference :votes, :post, null: false, foreign_key: true
  end
end
