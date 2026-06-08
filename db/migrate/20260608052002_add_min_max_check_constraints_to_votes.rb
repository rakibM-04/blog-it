# frozen_string_literal: true

class AddMinMaxCheckConstraintsToVotes < ActiveRecord::Migration[8.0]
  def change
    add_check_constraint :votes, "value >= -1 AND value <= 1", name: "vote_value_check"
  end
end
