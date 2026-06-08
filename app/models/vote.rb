# frozen_string_literal: true

class Vote < ApplicationRecord
  MAX_VOTE_VALUE = 1
  MIN_VOTE_VALUE = -1
  BLOGGABLE_THRESHOLD = 0

  belongs_to :user
  belongs_to :post

  validates_inclusion_of :value, in: [-1, 0, 1]
  validates :user_id, uniqueness: { scope: :post_id }
  after_save :set_bloggable!

  private

    def set_bloggable!
      post = Post.find(post_id)

      if post.votes.sum(:value) > BLOGGABLE_THRESHOLD
        post.update!(is_bloggable: true)
      else
        post.update!(is_bloggable: false)
      end
    end
end
