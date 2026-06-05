# frozen_string_literal: true

json.posts @posts do | post |
  json.extract! post,
    :title,
    :slug

  json.status post.status
  json.published_at post.published_at
  json.author post.user.name
  json.categories post.categories.map(&:name)
end

json.total_count current_user.posts_count
