# frozen_string_literal: true

json.posts @posts do | post |
  json.partial! "posts/post", post: post
  json.votesCount post.votes.sum(:value)
  json.voteValue post.votes.find_by(user_id: @user_id)&.value || 0
  json.isBloggable post.is_bloggable
end
