# frozen_string_literal: true

class AddStatusToPost < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :status, :string, default: "drafted"
  end
end
