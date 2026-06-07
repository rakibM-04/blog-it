# frozen_string_literal: true

json.posts @posts do | post |
  json.partial! "posts/post", post: post
end

json.total_count current_user.posts_count
