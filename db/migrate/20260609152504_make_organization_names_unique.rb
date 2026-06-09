# frozen_string_literal: true

class MakeOrganizationNamesUnique < ActiveRecord::Migration[8.0]
  def change
    add_index :organizations, :name, unique: true
  end
end
