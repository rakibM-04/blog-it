# frozen_string_literal: true

class RenameVoteTypeColumnToValueInVotes < ActiveRecord::Migration[8.0]
  def change
    rename_column :votes, :vote_type, :value
  end
end
