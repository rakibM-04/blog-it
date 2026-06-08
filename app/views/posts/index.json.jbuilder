# frozen_string_literal: true

json.posts @posts do | post |
  json.partial! "posts/post", post: post
  json.votes_count post.votes.sum(:value)
  json.vote_value post.votes.find_by(user_id: @user_id)&.value || 0
  json.is_bloggable post.is_bloggable
end
