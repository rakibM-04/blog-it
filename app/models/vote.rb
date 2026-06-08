# frozen_string_literal: true

class Vote < ApplicationRecord
  MAX_VOTE_VALUE = 1
  MIN_VOTE_VALUE = -1

  belongs_to :user
  belongs_to :post

  validates_inclusion_of :value, in: [-1, 0, 1]
  validates :user_id, uniqueness: { scope: :post_id }

  after_save :set_bloggable
  after_destroy :set_bloggable

  private

    def set_bloggable
      post.update(is_bloggable: post.votes.sum(:value) > Post::BLOGGABLE_THRESHOLD)
    end
end
