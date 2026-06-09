# frozen_string_literal: true

class MakeCategoryNamesUnique < ActiveRecord::Migration[8.0]
  def change
    add_index :categories, :name, unique: true
  end
end
