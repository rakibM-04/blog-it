# frozen_string_literal: true

class Organization < ApplicationRecord
  has_many :users, dependent: :nullify
  has_many :posts, dependent: :destroy
end
