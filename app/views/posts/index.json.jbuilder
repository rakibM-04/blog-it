# frozen_string_literal: true

json.posts @posts do | post |
  json.extract! post,
    :title,
    :slug

  json.published_at post.updated_at
  json.author post.user.name
  json.categories post.categories.map(&:name)
end
