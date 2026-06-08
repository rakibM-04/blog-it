# frozen_string_literal: true

class Votes < ActiveRecord::Migration[8.0]
  def change
    create_table :votes do |t|
      t.integer :vote_type, default: 0
      t.timestamps
    end
  end
end
