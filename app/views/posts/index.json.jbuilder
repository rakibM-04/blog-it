# frozen_string_literal: true

json.posts @posts do | post |
  json.extract! post,
    :title,
    :slug,
    :created_at

  json.author post.user.name
  json.categories post.categories.map(&:name)
end
