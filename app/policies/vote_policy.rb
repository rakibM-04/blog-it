# frozen_string_literal: true

class VotePolicy
  attr_reader :user, :vote

  def initialize(user, vote)
    @user = user
    @vote = vote
  end

  def create?
    user.organization_id == vote.post.organization_id
  end
end
